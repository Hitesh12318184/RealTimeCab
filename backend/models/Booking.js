const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  type: String,   // cab or bus
  from: String,
  to: String,
  date: String,
  time: String,
  userId: String
});

module.exports = mongoose.model("Booking", bookingSchema);
