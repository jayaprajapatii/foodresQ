import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/foodDonation.controller.js";

const router = Router();

router.post("/", authenticate, createDonation);
router.get("/", getDonations);
router.get("/:id", getDonation);
router.patch("/:id", authenticate, updateDonation);
router.delete("/:id", authenticate, deleteDonation);

export default router;