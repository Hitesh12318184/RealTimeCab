const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());

// ⛔ IMPORTANT — this loads your auth routes
app.use("/api", require("./routes/auth"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("RealtimeCab API Running...");
});

app.listen(5000, () => console.log("Server running on PORT 5000"));
