const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  vehicleType: { type: String, enum: ["SUV", "Sedan", "Mini", "Auto"], required: true },
  vehicleNumber: { type: String, required: true },

  status: { type: String, enum: ["online", "offline"], default: "offline" },

  location: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model("Driver", driverSchema);
