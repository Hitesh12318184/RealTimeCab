const express = require('express');
const router = express.Router();
const {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    updateSeatAvailability
} = require('../controllers/vehicle.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');

// Public routes
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);

// Admin only routes
router.post('/', authenticateUser, isAdmin, createVehicle);
router.put('/:id', authenticateUser, isAdmin, updateVehicle);
router.delete('/:id', authenticateUser, isAdmin, deleteVehicle);
router.patch('/:id/seats', authenticateUser, isAdmin, updateSeatAvailability);

module.exports = router;
