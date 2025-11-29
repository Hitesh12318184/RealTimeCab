const express = require("express");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify token
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).send({ error: "Invalid token" });
  }
}

// Create booking
router.post("/", auth, async (req, res) => {
  const booking = new Booking({
    ...req.body,
    userId: req.userId
  });
  await booking.save();
  res.send({ message: "Booking successful", booking });
});

// Get bookings of logged user
router.get("/", auth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.userId });
  res.send(bookings);
});

module.exports = router;
