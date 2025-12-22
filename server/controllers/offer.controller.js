const Offer = require('../models/offer.model');

/**
 * Get all active offers for users
 */
const getActiveOffers = async (req, res) => {
    try {
        const now = new Date();

        const offers = await Offer.find({
            isActive: true,
            validFrom: { $lte: now },
            validTill: { $gte: now }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: offers.length,
            data: { offers }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching offers',
            error: error.message
        });
    }
};

/**
 * Get all offers (Admin only)
 */
const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: offers.length,
            data: { offers }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching offers',
            error: error.message
        });
    }
};

/**
 * Get offer by ID or code
 */
const getOfferByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const offer = await Offer.findOne({ code: code.toUpperCase() });

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { offer }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching offer',
            error: error.message
        });
    }
};

/**
 * Validate offer
 */
const validateOffer = async (req, res) => {
    try {
        const { code, bookingAmount, vehicleType } = req.body;

        if (!code || !bookingAmount || !vehicleType) {
            return res.status(400).json({
                success: false,
                message: 'Code, booking amount, and vehicle type are required'
            });
        }

        const offer = await Offer.findOne({ code: code.toUpperCase() });

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Invalid offer code'
            });
        }

        const validation = offer.isValidOffer(bookingAmount, vehicleType);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        const discount = offer.calculateDiscount(bookingAmount);

        res.status(200).json({
            success: true,
            message: 'Offer is valid',
            data: {
                offer: {
                    code: offer.code,
                    title: offer.title,
                    discountType: offer.discountType,
                    discountValue: offer.discountValue
                },
                discountAmount: discount,
                finalAmount: bookingAmount - discount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error validating offer',
            error: error.message
        });
    }
};

/**
 * Create new offer (Admin only)
 */
const createOffer = async (req, res) => {
    try {
        const offer = await Offer.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Offer created successfully',
            data: { offer }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating offer',
            error: error.message
        });
    }
};

/**
 * Update offer (Admin only)
 */
const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Offer updated successfully',
            data: { offer }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating offer',
            error: error.message
        });
    }
};

/**
 * Delete offer (Admin only)
 */
const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Offer deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting offer',
            error: error.message
        });
    }
};

/**
 * Toggle offer status (Admin only)
 */
const toggleOfferStatus = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found'
            });
        }

        offer.isActive = !offer.isActive;
        await offer.save();

        res.status(200).json({
            success: true,
            message: `Offer ${offer.isActive ? 'activated' : 'deactivated'} successfully`,
            data: { offer }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error toggling offer status',
            error: error.message
        });
    }
};

module.exports = {
    getActiveOffers,
    getAllOffers,
    getOfferByCode,
    validateOffer,
    createOffer,
    updateOffer,
    deleteOffer,
    toggleOfferStatus
};
