import express from "express";

import {
  getAppointments,
  setAppointment,
  updateAppointment,
} from "../controllers/appointments.js";

const router = express.Router();

router.get("/", getAppointments);
router.post("/", setAppointment);
router.put("/", updateAppointment);

export default router;
