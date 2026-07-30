import { Router } from "express";
import { createDonation } from "../controllers/foodDonation.controller.js";

const router = Router();

router.post("/", createDonation);

export default router;