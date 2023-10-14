import express from "express";
import { getReceipeDetails, setReceipe } from "../controllers/receipes.js";

const router = express.Router();

router.get("/", getReceipeDetails);
router.post("/", setReceipe);

export default router;
