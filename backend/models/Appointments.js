import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: String,
  time: String,
  date: String,
  desc: String,
  status: String,
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;