const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Offer code is required'],
        unique: true,
        uppercase: true,
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Offer title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Offer description is required']
    },
    discountType: {
        type: String,
        enum: ['percentage', 'flat'],
        required: [true, 'Discount type is required']
    },
    discountValue: {
        type: Number,
        required: [true, 'Discount value is required'],
        min: [0, 'Discount value cannot be negative']
    },
    maxDiscount: {
        type: Number,
        default: null // null means no limit
    },
    minBookingAmount: {
        type: Number,
        default: 0
    },
    validFrom: {
        type: Date,
        required: [true, 'Valid from date is required']
    },
    validTill: {
        type: Date,
        required: [true, 'Valid till date is required']
    },
    usageLimit: {
        type: Number,
        default: null // null means unlimited
    },
    usedCount: {
        type: Number,
        default: 0
    },
    applicableOn: {
        type: String,
        enum: ['all', 'car', 'bus'],
        default: 'all'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    termsAndConditions: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

// Method to check if offer is valid
offerSchema.methods.isValidOffer = function (bookingAmount, vehicleType) {
    const now = new Date();

    // Check if offer is active
    if (!this.isActive) return { valid: false, message: 'Offer is not active' };

    // Check validity dates
    if (now < this.validFrom) return { valid: false, message: 'Offer has not started yet' };
    if (now > this.validTill) return { valid: false, message: 'Offer has expired' };

    // Check usage limit
    if (this.usageLimit !== null && this.usedCount >= this.usageLimit) {
        return { valid: false, message: 'Offer usage limit reached' };
    }

    // Check minimum booking amount
    if (bookingAmount < this.minBookingAmount) {
        return { valid: false, message: `Minimum booking amount is ₹${this.minBookingAmount}` };
    }

    // Check vehicle type applicability
    if (this.applicableOn !== 'all' && this.applicableOn !== vehicleType) {
        return { valid: false, message: `Offer applicable only on ${this.applicableOn}` };
    }

    return { valid: true, message: 'Offer is valid' };
};

// Method to calculate discount
offerSchema.methods.calculateDiscount = function (bookingAmount) {
    let discount = 0;

    if (this.discountType === 'percentage') {
        discount = (bookingAmount * this.discountValue) / 100;

        // Apply max discount limit if exists
        if (this.maxDiscount !== null && discount > this.maxDiscount) {
            discount = this.maxDiscount;
        }
    } else {
        // Flat discount
        discount = this.discountValue;
    }

    // Discount cannot exceed booking amount
    return Math.min(discount, bookingAmount);
};

// Index for efficient querying
offerSchema.index({ code: 1 });
offerSchema.index({ isActive: 1, validTill: -1 });

module.exports = mongoose.model('Offer', offerSchema);
