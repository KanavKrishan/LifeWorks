const express = require("express");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  await Appointment.create({ ...req.body, userId: req.user.id });
  res.json("Appointment booked");
});

router.get("/", auth, async (req, res) => {
  const data = await Appointment.find({ userId: req.user.id });
  res.json(data);
});

module.exports = router;
