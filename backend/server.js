const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const driverRoutes = require("./routes/driver");
 
dotenv.config();

const app = express();
app.use(express.json());

// ===============================
// DRIVER ROUTES


// ===============================
app.use("/api/driver", driverRoutes);

// ===============================
// USER AUTH ROUTES
// ===============================
app.use("/api", require("./routes/auth"));

// ===============================
// BOOKING ROUTES
// ===============================
app.use("/api/bookings", require("./routes/booking"));

// ===============================
// DB CONNECTION
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ===============================
// DEFAULT ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("RealtimeCab API Running...");
});

// ===============================
// START SERVER
// ===============================
app.listen(5000, () => console.log("Server running on PORT 5000"));
