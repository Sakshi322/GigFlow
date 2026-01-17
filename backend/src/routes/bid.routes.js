import express from "express";
import { submitBid, getBidsForGig, hireBid } from "../controllers/bid.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.delete("/dev/clear-bids", async (req, res) => {
  await Bid.deleteMany({});
  res.json({ message: "All bids cleared" });
});


router.post("/", protect, submitBid);
router.get("/:gigId", protect, getBidsForGig);
router.patch("/:bidId/hire", protect, hireBid);


export default router;
