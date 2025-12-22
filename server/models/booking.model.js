const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: [true, 'Route reference is required']
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: [true, 'Vehicle reference is required']
    },
    bookingDate: {
        type: Date,
        required: [true, 'Booking date is required']
    },
    travelDate: {
        type: Date,
        required: [true, 'Travel date is required']
    },
    // For bus bookings
    selectedSeats: {
        type: [String],
        default: []
    },
    numberOfPassengers: {
        type: Number,
        required: [true, 'Number of passengers is required'],
        min: [1, 'At least one passenger is required']
    },
    passengerDetails: [{
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: 1
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Amount cannot be negative']
    },
    discountAmount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative']
    },
    finalAmount: {
        type: Number,
        required: true,
        min: [0, 'Final amount cannot be negative']
    },
    appliedOffer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled', 'completed'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'wallet', 'cash', 'none'],
        default: 'none'
    },
    bookingNumber: {
        type: String,
        unique: true
    },
    adminNotes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Generate unique booking number before saving
bookingSchema.pre('save', function () {
    if (this.isNew && !this.bookingNumber) {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        this.bookingNumber = `BK${timestamp}${random}`;
    }
});

// Index for efficient queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ bookingNumber: 1 });
bookingSchema.index({ travelDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
