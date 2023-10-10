import express from "express";
import {
  getAppointments,
  getCustomers,
  getReceipes,
  setAppointment,
  setCustomer,
  setReceipe,
  updateAppointment,
} from "../controllers/customers.js";

const router = express.Router();

router.get("/appointments/", getAppointments);
router.post("/appointments/", setAppointment);

router.put("/appointments/", updateAppointment);

router.get("/receipes/", getReceipes);
router.post("/receipe/", setReceipe);

router.get("/", getCustomers);
router.post("/", setCustomer);

export default router;
