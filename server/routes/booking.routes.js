const express = require('express');
const router = express.Router();
const {
    createBooking,
    getUserBookings,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    cancelBooking
} = require('../controllers/booking.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');

// User routes
router.post('/', authenticateUser, createBooking);
router.get('/my-bookings', authenticateUser, getUserBookings);
router.get('/:id', authenticateUser, getBookingById);
router.patch('/:id/cancel', authenticateUser, cancelBooking);

// Admin routes
router.get('/', authenticateUser, isAdmin, getAllBookings);
router.patch('/:id/status', authenticateUser, isAdmin, updateBookingStatus);

module.exports = router;
