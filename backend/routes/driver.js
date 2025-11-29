const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Allowed Car Types
const CAR_TYPES = ["Sedan", "SUV", "Hatchback"];

// -------------------------------
// REGISTER DRIVER
// -------------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, vehicleNumber, carType } = req.body;

    if (!CAR_TYPES.includes(carType)) {
      return res.status(400).json({ message: "Invalid car type selected" });
    }

    const existing = await Driver.findOne({ email });
    if (existing) return res.status(400).json({ message: "Driver already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      name,
      email,
      password: hashed,
      vehicleNumber,
      carType,
      location: { lat: 0, lng: 0 },
      status: "available",
      currentRide: null
    });

    res.json({ message: "Driver registered successfully", driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------
// DRIVER LOGIN
// -------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email });
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    const match = await bcrypt.compare(password, driver.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login success", token, driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------
// UPDATE DRIVER LIVE LOCATION
// -------------------------------
router.put("/location", async (req, res) => {
  try {
    const { driverId, lat, lng } = req.body;

    const driver = await Driver.findByIdAndUpdate(
      driverId,
      { location: { lat, lng } },
      { new: true }
    );

    res.json({ message: "Location updated", driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------
// ACCEPT RIDE
// -------------------------------
router.post("/accept-ride", async (req, res) => {
  try {
    const { driverId, rideId } = req.body;

    const driver = await Driver.findByIdAndUpdate(
      driverId,
      { currentRide: rideId, status: "busy" },
      { new: true }
    );

    res.json({ message: "Ride accepted", driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------
// COMPLETE RIDE
// -------------------------------
router.post("/complete-ride", async (req, res) => {
  try {
    const { driverId } = req.body;

    const driver = await Driver.findByIdAndUpdate(
      driverId,
      { currentRide: null, status: "available" },
      { new: true }
    );

    res.json({ message: "Ride completed", driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
