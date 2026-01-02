require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// DB
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Test
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/ai", require("./routes/ai.routes"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
