import { Router } from "express";
import {
  createDonation,
  getDonations,
  getDonation,
  updateDonation,
} from "../controllers/foodDonation.controller.js";

const router = Router();

router.post("/", createDonation);
router.get("/", getDonations);
router.get("/:id", getDonation);
router.patch("/:id", updateDonation);

export default router;