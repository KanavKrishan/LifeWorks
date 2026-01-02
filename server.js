require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ ADD THIS (AUTH ROUTES)
app.use("/api/auth", require("./routes/auth.routes"));

// Optional future routes
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/ai", require("./routes/ai.routes"));

// Test API
app.get("/api/test", (req, res) => {
  res.send("API working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
