const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  pickup: { type: String, required: true },
  drop: { type: String, required: true },

  carType: { 
    type: String, 
    enum: ["Sedan", "SUV", "Hatchback"], 
    required: true 
  },

  phone: { type: String, required: true },
  rideTime: { type: String, required: true },

  status: { 
    type: String, 
    enum: ["pending", "accepted", "completed"], 
    default: "pending" 
  },

  driverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Driver", 
    default: null 
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);
