const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  vehicleType: String,
  vehicleNumber: String
});

module.exports = mongoose.model("Driver", driverSchema);
