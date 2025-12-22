const Booking = require('../models/booking.model');
const Vehicle = require('../models/vehicle.model');
const Offer = require('../models/offer.model');

/**
 * Create a new booking
 */
const createBooking = async (req, res) => {
    try {
        const {
            route,
            vehicle,
            travelDate,
            bookingDate,
            selectedSeats,
            numberOfPassengers,
            passengerDetails,
            totalAmount,
            offerCode
        } = req.body;

        // Validate required fields
        if (!route || !vehicle || !travelDate || !numberOfPassengers || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                error: 'route, vehicle, travelDate, numberOfPassengers, and totalAmount are required'
            });
        }

        let discountAmount = 0;
        let appliedOffer = null;

        // Apply offer if provided
        if (offerCode && offerCode.trim() !== '') {
            try {
                const offer = await Offer.findOne({ code: offerCode.toUpperCase(), isActive: true });

                if (offer) {
                    const vehicleDoc = await Vehicle.findById(vehicle);
                    const validation = offer.isValidOffer(totalAmount, vehicleDoc.type);

                    if (validation.valid) {
                        discountAmount = offer.calculateDiscount(totalAmount);
                        appliedOffer = offer._id;

                        // Increment usage count
                        offer.usedCount += 1;
                        await offer.save();
                    }
                }
            } catch (offerError) {
                console.log('Offer validation error:', offerError.message);
                // Continue with booking even if offer fails
            }
        }

        // Ensure finalAmount is valid
        const finalAmount = Math.max(0, (totalAmount || 0) - (discountAmount || 0));

        // Create booking
        const booking = await Booking.create({
            user: req.user._id,
            route,
            vehicle,
            bookingDate: bookingDate || new Date(),
            travelDate,
            selectedSeats: selectedSeats || [],
            numberOfPassengers,
            passengerDetails: passengerDetails || [],
            totalAmount,
            discountAmount: discountAmount || 0,
            finalAmount,
            appliedOffer
        });

        // Update seat availability if it's a bus booking
        if (selectedSeats && selectedSeats.length > 0) {
            try {
                const vehicleDoc = await Vehicle.findById(vehicle);
                if (vehicleDoc && vehicleDoc.type === 'bus') {
                    selectedSeats.forEach(seatNum => {
                        const seat = vehicleDoc.seats.find(s => s.seatNumber === seatNum);
                        if (seat) {
                            seat.isAvailable = false;
                        }
                    });
                    await vehicleDoc.save();
                }
            } catch (seatError) {
                console.log('Seat update error:', seatError.message);
                // Continue even if seat update fails
            }
        }

        const populatedBooking = await Booking.findById(booking._id)
            .populate('user', 'name email phone')
            .populate('route')
            .populate('vehicle')
            .populate('appliedOffer');

        // Emit socket event to notify admin of new booking
        const { emitNewBookingToAdmin } = require('../sockets/socket');
        emitNewBookingToAdmin(populatedBooking);

        // Send confirmation email to user (you'll need to implement this)
        try {
            // await sendBookingConfirmationEmail(populatedBooking);
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
        }

        res.status(201).json({
            success: true,
            message: 'Booking created successfully! Waiting for admin approval.',
            data: {
                booking: populatedBooking,
                confirmationNumber: populatedBooking.bookingNumber,
                nextSteps: [
                    'Your booking is pending admin approval.',
                    'You will receive a confirmation email once approved.',
                    'You can check your booking status in the My Bookings section.'
                ]
            }
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
};

/**
 * Get user's booking history
 */
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('route')
            .populate('vehicle')
            .populate('appliedOffer')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: { bookings }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: error.message
        });
    }
};

/**
 * Get all bookings (Admin only)
 */
const getAllBookings = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};

        if (status) filter.status = status;

        const bookings = await Booking.find(filter)
            .populate('user', 'name email phone')
            .populate('route')
            .populate('vehicle')
            .populate('appliedOffer')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: { bookings }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: error.message
        });
    }
};

/**
 * Get booking by ID
 */
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('route')
            .populate('vehicle')
            .populate('appliedOffer');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if user is authorized to view this booking
        if (req.user.role !== 'admin' && booking.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: { booking }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching booking',
            error: error.message
        });
    }
};

/**
 * Update booking status (Admin only - for approve/reject)
 */
const updateBookingStatus = async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const { id } = req.params;

        // Find and populate booking
        const booking = await Booking.findById(id)
            .populate('user', 'name email phone')
            .populate('route')
            .populate('vehicle')
            .populate('appliedOffer');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Validate status transition
        const validTransitions = {
            'pending': ['approved', 'rejected'],
            'approved': ['completed', 'cancelled'],
            'rejected': ['approved'],
            'cancelled': [],
            'completed': []
        };

        if (booking.status !== status && !validTransitions[booking.status]?.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Cannot change status from ${booking.status} to ${status}`
            });
        }

        // If status hasn't changed, just update notes if provided
        if (booking.status === status) {
            if (adminNotes) {
                booking.adminNotes = adminNotes;
                await booking.save();
            }

            return res.status(200).json({
                success: true,
                message: 'Booking notes updated',
                data: { booking }
            });
        }

        // Handle status changes
        const previousStatus = booking.status;
        booking.status = status;

        if (adminNotes) {
            booking.adminNotes = adminNotes;
        }

        // If booking is being rejected or cancelled, make seats available again
        if ((status === 'rejected' || status === 'cancelled') &&
            booking.vehicle?.type === 'bus' &&
            booking.selectedSeats?.length > 0) {

            const vehicle = await Vehicle.findById(booking.vehicle._id);
            if (vehicle) {
                booking.selectedSeats.forEach(seatNum => {
                    const seat = vehicle.seats.find(s => s.seatNumber === seatNum);
                    if (seat) {
                        seat.isAvailable = true;
                    }
                });
                await vehicle.save();

                // Emit seat availability update
                const { emitSeatAvailabilityUpdate } = require('../sockets/socket');
                emitSeatAvailabilityUpdate(vehicle._id, vehicle.seats);
            }
        }

        await booking.save();

        // Emit status update to user
        const { emitBookingStatusUpdate } = require('../sockets/socket');
        emitBookingStatusUpdate(booking.user._id, booking);

        // Send notification email to user
        try {
            // await sendBookingStatusUpdateEmail(booking);
        } catch (emailError) {
            console.error('Error sending status update email:', emailError);
        }

        res.status(200).json({
            success: true,
            message: `Booking ${status} successfully`,
            data: { booking }
        });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating booking status',
            error: error.message
        });
    }
};

/**
 * Cancel booking (User can cancel their own booking)
 */
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if user owns this booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this booking'
            });
        }

        if (booking.status !== 'pending' && booking.status !== 'approved') {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel this booking'
            });
        }

        // Make seats available again
        if (booking.selectedSeats.length > 0) {
            const vehicle = await Vehicle.findById(booking.vehicle);
            if (vehicle && vehicle.type === 'bus') {
                booking.selectedSeats.forEach(seatNum => {
                    const seat = vehicle.seats.find(s => s.seatNumber === seatNum);
                    if (seat) {
                        seat.isAvailable = true;
                    }
                });
                await vehicle.save();
            }
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            data: { booking }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error cancelling booking',
            error: error.message
        });
    }
};

module.exports = {
    createBooking,
    getUserBookings,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    cancelBooking
};
