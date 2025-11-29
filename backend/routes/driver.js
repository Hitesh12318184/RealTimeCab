const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver");

const router = express.Router();


// Driver Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, phone, password, vehicleType, vehicleNumber } = req.body;

    const exists = await Driver.findOne({ phone });
    if (exists) return res.status(400).send({ error: "Phone already used" });

    const hashed = await bcrypt.hash(password, 10);

    const driver = new Driver({
      name,
      phone,
      password: hashed,
      vehicleType,
      vehicleNumber
    });

    await driver.save();
    res.send({ message: "Driver registered successfully" });
  } catch (err) {
    res.status(400).send({ error: "Error creating driver" });
  }
});


// Driver Login
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  const driver = await Driver.findOne({ phone });
  if (!driver) return res.status(400).send({ error: "Driver not found" });

  const match = await bcrypt.compare(password, driver.password);
  if (!match) return res.status(400).send({ error: "Wrong password" });

  const token = jwt.sign({ id: driver._id }, process.env.JWT_SECRET);

  res.send({
    message: "Login successful",
    token,
    driverId: driver._id
  });
});


// Update Driver Status (online/offline)
router.post("/status", async (req, res) => {
  const { driverId, status } = req.body;

  await Driver.findByIdAndUpdate(driverId, { status });
  res.send({ message: "Status updated" });
});


// Update Driver Live Location
router.post("/location", async (req, res) => {
  const { driverId, lat, lng } = req.body;

  await Driver.findByIdAndUpdate(driverId, {
    location: { lat, lng }
  });

  res.send({ message: "Location updated" });
});


module.exports = router;
