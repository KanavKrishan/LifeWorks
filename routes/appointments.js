const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  userId: String,
  counsellor: String,
  date: String,
  time: String,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
