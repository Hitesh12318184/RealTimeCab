const Vehicle = require('../models/vehicle.model');

/**
 * Get all vehicles with optional filters
 */
const getAllVehicles = async (req, res) => {
    try {
        const { type, isActive } = req.query;
        const filter = {};

        if (type) filter.type = type;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: vehicles.length,
            data: { vehicles }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching vehicles',
            error: error.message
        });
    }
};

/**
 * Get vehicle by ID
 */
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { vehicle }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching vehicle',
            error: error.message
        });
    }
};

/**
 * Create new vehicle (Admin only)
 */
const createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Vehicle created successfully',
            data: { vehicle }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating vehicle',
            error: error.message
        });
    }
};

/**
 * Update vehicle (Admin only)
 */
const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Vehicle updated successfully',
            data: { vehicle }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating vehicle',
            error: error.message
        });
    }
};

/**
 * Delete vehicle (Admin only)
 */
const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Vehicle deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting vehicle',
            error: error.message
        });
    }
};

/**
 * Update seat availability for a bus
 */
const updateSeatAvailability = async (req, res) => {
    try {
        const { seatNumbers, isAvailable } = req.body;
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        if (vehicle.type !== 'bus') {
            return res.status(400).json({
                success: false,
                message: 'Seat management is only available for buses'
            });
        }

        // Update seat availability
        seatNumbers.forEach(seatNum => {
            const seat = vehicle.seats.find(s => s.seatNumber === seatNum);
            if (seat) {
                seat.isAvailable = isAvailable;
            }
        });

        await vehicle.save();

        res.status(200).json({
            success: true,
            message: 'Seat availability updated successfully',
            data: { vehicle }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating seat availability',
            error: error.message
        });
    }
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    updateSeatAvailability
};
