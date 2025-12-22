const express = require('express');
const router = express.Router();
const {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    searchRoutes
} = require('../controllers/route.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');

// Public routes
router.get('/', getAllRoutes);
router.get('/search', searchRoutes);
router.get('/:id', getRouteById);

// Admin only routes
router.post('/', authenticateUser, isAdmin, createRoute);
router.put('/:id', authenticateUser, isAdmin, updateRoute);
router.delete('/:id', authenticateUser, isAdmin, deleteRoute);

module.exports = router;
