const express = require("express");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

const router = express.Router();

/* ================= CREATE APPOINTMENT ================= */
router.post("/", auth, async (req, res) => {
  try {
    const { counsellor, date, time } = req.body;

    if (!counsellor || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const appointment = await Appointment.create({
      counsellor,
      date,
      time,
      userId: req.user.id
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (err) {
    console.error("Appointment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET USER APPOINTMENTS ================= */
router.get("/", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .sort({ date: 1 });

    res.json(appointments);

  } catch (err) {
    console.error("Fetch appointments error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
