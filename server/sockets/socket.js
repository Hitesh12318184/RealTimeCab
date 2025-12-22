/**
 * Socket.IO event handlers for real-time features
 */

let io;

const initializeSocket = (socketIO) => {
    io = socketIO;

    io.on('connection', (socket) => {
        console.log(`✅ Client connected: ${socket.id}`);

        // Join user-specific room
        socket.on('join', (userId) => {
            socket.join(`user:${userId}`);
            console.log(`User ${userId} joined their room`);
        });

        // Join admin room
        socket.on('join-admin', () => {
            socket.join('admin-room');
            console.log(`Admin joined admin room`);
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });
    });
};

/**
 * Emit booking status update to specific user
 */
const emitBookingStatusUpdate = (userId, booking) => {
    if (io) {
        io.to(`user:${userId}`).emit('booking-status-updated', {
            bookingId: booking._id,
            status: booking.status,
            booking: booking
        });
        console.log(`Booking status update sent to user ${userId}`);
    }
};

/**
 * Emit new booking notification to admin
 */
const emitNewBookingToAdmin = (booking) => {
    if (io) {
        io.to('admin-room').emit('new-booking', {
            bookingId: booking._id,
            booking: booking
        });
        console.log('New booking notification sent to admin');
    }
};

/**
 * Emit seat availability update
 */
const emitSeatAvailabilityUpdate = (vehicleId, seats) => {
    if (io) {
        io.emit('seat-availability-updated', {
            vehicleId,
            seats
        });
        console.log(`Seat availability update sent for vehicle ${vehicleId}`);
    }
};

/**
 * Broadcast general notification
 */
const emitNotification = (userId, notification) => {
    if (io) {
        io.to(`user:${userId}`).emit('notification', notification);
    }
};

module.exports = {
    initializeSocket,
    emitBookingStatusUpdate,
    emitNewBookingToAdmin,
    emitSeatAvailabilityUpdate,
    emitNotification
};
