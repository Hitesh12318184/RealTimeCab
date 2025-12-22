const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    days: {
        type: [String],
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        default: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
});

const routeSchema = new mongoose.Schema({
    source: {
        type: String,
        required: [true, 'Source is required'],
        trim: true
    },
    destination: {
        type: String,
        required: [true, 'Destination is required'],
        trim: true
    },
    distance: {
        type: Number,
        required: [true, 'Distance is required'],
        min: [1, 'Distance must be at least 1 km']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: [true, 'Vehicle reference is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price must be at least 1']
    },
    schedule: scheduleSchema,

    stops: {
        type: [String],
        default: []
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for efficient searching
routeSchema.index({ source: 1, destination: 1, isActive: 1 });
routeSchema.index({ vehicle: 1 });

// Virtual for route name
routeSchema.virtual('routeName').get(function () {
    return `${this.source} → ${this.destination}`;
});

// Ensure virtual fields are serialized
routeSchema.set('toJSON', { virtuals: true });
routeSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Route', routeSchema);
