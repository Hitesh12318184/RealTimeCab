const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver");

// POST /api/driver/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, phone, password, vehicleType, vehicleNumber } = req.body;

    const existing = await Driver.findOne({ phone });
    if (existing) {
      return res.status(400).json({ error: "Driver already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const driver = new Driver({
      name,
      phone,
      password: hashed,
      vehicleType,
      vehicleNumber
    });

    await driver.save();

    res.json({ message: "Driver signup successful", driver });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
