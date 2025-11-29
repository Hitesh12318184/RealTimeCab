const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    carType: {
      type: String,
      enum: ["Sedan", "SUV", "Hatchback"], // only these 3 allowed
      required: true,
    },

    location: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },

    status: {
      type: String,
      enum: ["available", "busy"],
      default: "available",
    },

    currentRide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", DriverSchema);
