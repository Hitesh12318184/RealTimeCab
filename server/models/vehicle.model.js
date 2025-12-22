const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        enum: ['sleeper', 'seater', 'normal'],
        default: 'normal'
    }
});

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vehicle name is required'],
        trim: true
    },
    vehicleNumber: {
        type: String,
        required: [true, 'Vehicle number is required'],
        unique: true,
        uppercase: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['car', 'bus'],
        required: [true, 'Vehicle type is required']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        trim: true
    },
    capacity: {
        type: Number,
        required: [true, 'Capacity is required'],
        min: [1, 'Capacity must be at least 1']
    },
    // Seat configuration (mainly for buses)
    seats: [seatSchema],

    // Car specific fields
    carType: {
        type: String,
        enum: ['sedan', 'suv', 'hatchback', 'luxury', 'none'],
        default: 'none'
    },

    // Bus specific fields
    busType: {
        type: String,
        enum: ['ac', 'non-ac', 'sleeper', 'semi-sleeper', 'none'],
        default: 'none'
    },

    amenities: {
        type: [String],
        default: []
    },

    isActive: {
        type: Boolean,
        default: true
    },

    images: {
        type: [String],
        default: []
    },

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
}, {
    timestamps: true
});

// Auto-generate seats based on capacity for buses
vehicleSchema.pre('save', function () {
    if (this.isNew && this.type === 'bus' && this.seats.length === 0) {
        const seatType = this.busType.includes('sleeper') ? 'sleeper' : 'seater';

        for (let i = 1; i <= this.capacity; i++) {
            this.seats.push({
                seatNumber: `S${i}`,
                isAvailable: true,
                type: seatType
            });
        }
    }
});

// Method to get available seats count
vehicleSchema.methods.getAvailableSeatsCount = function () {
    if (this.type === 'bus') {
        return this.seats.filter(seat => seat.isAvailable).length;
    }
    return this.capacity; // For cars, return full capacity
};

module.exports = mongoose.model('Vehicle', vehicleSchema);
