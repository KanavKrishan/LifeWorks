require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/auth.routes");
const appointmentRoutes = require("./routes/appointment.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

// 🔹 Connect Database
connectDB();

// 🔹 Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// 🔹 Health check
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/api/test", (req, res) => {
  res.send("API working");
});

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/ai", aiRoutes);

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
