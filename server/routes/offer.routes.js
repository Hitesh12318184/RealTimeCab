const express = require('express');
const router = express.Router();
const {
    getActiveOffers,
    getAllOffers,
    getOfferByCode,
    validateOffer,
    createOffer,
    updateOffer,
    deleteOffer,
    toggleOfferStatus
} = require('../controllers/offer.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');

// Public/User routes
router.get('/active', getActiveOffers);
router.get('/code/:code', getOfferByCode);
router.post('/validate', validateOffer);

// Admin routes
router.get('/', authenticateUser, isAdmin, getAllOffers);
router.post('/', authenticateUser, isAdmin, createOffer);
router.put('/:id', authenticateUser, isAdmin, updateOffer);
router.delete('/:id', authenticateUser, isAdmin, deleteOffer);
router.patch('/:id/toggle', authenticateUser, isAdmin, toggleOfferStatus);

module.exports = router;
