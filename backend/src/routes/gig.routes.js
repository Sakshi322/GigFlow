import express from "express";
import { createGig, getGigs, getMyGigs } from "../controllers/gig.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", protect, createGig);
router.get("/my", protect, getMyGigs);

export default router;
