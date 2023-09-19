import express from "express";
import {
  getAppointments,
  getCustomers,
  setAppointment,
  setCustomer,
  updateAppointment,
} from "../controllers/customers.js";

const router = express.Router();

router.get("/appointments/", getAppointments);
router.post("/appointments/", setAppointment);

router.put("/appointments/", updateAppointment);

router.get("/", getCustomers);
router.post("/", setCustomer);

export default router;
