const Route = require('../models/route.model');

/**
 * Get all routes with optional filters
 */
const getAllRoutes = async (req, res) => {
    try {
        const { source, destination, isActive } = req.query;
        const filter = {};

        if (source) filter.source = new RegExp(source, 'i');
        if (destination) filter.destination = new RegExp(destination, 'i');
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const routes = await Route.find(filter)
            .populate('vehicle')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: routes.length,
            data: { routes }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching routes',
            error: error.message
        });
    }
};

/**
 * Get route by ID
 */
const getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id).populate('vehicle');

        if (!route) {
            return res.status(404).json({
                success: false,
                message: 'Route not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { route }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching route',
            error: error.message
        });
    }
};

/**
 * Create new route (Admin only)
 */
const createRoute = async (req, res) => {
    try {
        const route = await Route.create(req.body);
        await route.populate('vehicle');

        res.status(201).json({
            success: true,
            message: 'Route created successfully',
            data: { route }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating route',
            error: error.message
        });
    }
};

/**
 * Update route (Admin only)
 */
const updateRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('vehicle');

        if (!route) {
            return res.status(404).json({
                success: false,
                message: 'Route not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Route updated successfully',
            data: { route }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating route',
            error: error.message
        });
    }
};

/**
 * Delete route (Admin only)
 */
const deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);

        if (!route) {
            return res.status(404).json({
                success: false,
                message: 'Route not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Route deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting route',
            error: error.message
        });
    }
};

/**
 * Search routes by source and destination
 */
const searchRoutes = async (req, res) => {
    try {
        const { source, destination, date, vehicleType } = req.query;

        if (!source || !destination) {
            return res.status(400).json({
                success: false,
                message: 'Source and destination are required'
            });
        }

        const filter = {
            source: new RegExp(source, 'i'),
            destination: new RegExp(destination, 'i'),
            isActive: true
        };

        const routes = await Route.find(filter).populate({
            path: 'vehicle',
            match: vehicleType ? { type: vehicleType, isActive: true } : { isActive: true }
        });

        // Filter out routes where vehicle doesn't match
        const filteredRoutes = routes.filter(route => route.vehicle !== null);

        res.status(200).json({
            success: true,
            count: filteredRoutes.length,
            data: { routes: filteredRoutes }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching routes',
            error: error.message
        });
    }
};

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    searchRoutes
};
