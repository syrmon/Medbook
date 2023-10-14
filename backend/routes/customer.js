import express from "express";
import { getCustomers, setCustomer } from "../controllers/customers.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", setCustomer);

export default router;
