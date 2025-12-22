const express = require('express');
const router = express.Router();
const {
    getDashboardStats,
    getAllUsers,
    toggleUserStatus
} = require('../controllers/admin.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');

// All routes require authentication and admin role
router.use(authenticateUser);
router.use(isAdmin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/toggle', toggleUserStatus);

module.exports = router;
