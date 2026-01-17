import Bid from "../models/Bid.model.js";
import Gig from "../models/Gig.model.js";
import mongoose from "mongoose";

/* Submit a bid */
export const submitBid = async (req, res) => {
  const { gigId, amount, proposal } = req.body;

  if (!gigId || !amount || !proposal) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const gig = await Gig.findById(gigId);
  if (!gig) {
    return res.status(404).json({ message: "Gig not found" });
  }

  // Prevent owner from bidding
  if (gig.ownerId.toString() === req.user._id.toString()) {
    return res.status(403).json({ message: "Cannot bid on your own gig" });
  }

  // Prevent duplicate bids
  const existingBid = await Bid.findOne({
    gigId,
    freelancerId: req.user._id
  });

  if (existingBid) {
    return res.status(400).json({ message: "You already bid on this gig" });
  }

  const bid = await Bid.create({
    gigId,
    freelancerId: req.user._id,
    amount,
    proposal
  });

  res.status(201).json({
    message: "Bid submitted",
    bid
  });
};


/* View bids for a gig (owner only) */
export const getBidsForGig = async (req, res) => {
  const { gigId } = req.params;

  const gig = await Gig.findById(gigId);
  if (!gig) {
    return res.status(404).json({ message: "Gig not found" });
  }

  // Owner only
  if (gig.ownerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  const bids = await Bid.find({ gigId })
    .populate("freelancerId", "name email")
    .sort({ createdAt: -1 });

  res.json(bids);
};





/* Hire a freelancer */

export const hireBid = async (req, res) => {
  const bid = await Bid.findById(req.params.bidId);
  if (!bid) return res.status(404).json({ message: "Bid not found" });

  const gig = await Gig.findById(bid.gigId);
  if (!gig) return res.status(404).json({ message: "Gig not found" });

  if (gig.ownerId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  if (gig.status === "assigned") {
    return res.status(400).json({ message: "Gig already assigned" });
  }

  // Update gig first (atomic check)
  const updatedGig = await Gig.findOneAndUpdate(
    { _id: gig._id, status: "open" },
    { status: "assigned" },
    { new: true }
  );

  if (!updatedGig) {
    return res.status(400).json({ message: "Gig already assigned" });
  }

  // Hire selected bid
  await Bid.findByIdAndUpdate(bid._id, { status: "hired" });

  // Reject others
  await Bid.updateMany(
    { gigId: gig._id, _id: { $ne: bid._id } },
    { status: "rejected" }
  );

  return res.json({
  message: "Freelancer hired successfully",
  hiredBidId: bid._id
});

};
