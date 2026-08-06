import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
  claimDonation,
  pickupDonation,
} from "../controllers/foodDonation.controller.js";

const router = Router();

router.post("/", authenticate, createDonation);
router.get("/", getDonations);
router.get("/:id", getDonation);
router.patch("/:id", authenticate, updateDonation);
router.delete("/:id", authenticate, deleteDonation);
router.patch("/:id/claim", authenticate, claimDonation);
router.patch("/:id/pickup", authenticate, pickupDonation);

export default router;