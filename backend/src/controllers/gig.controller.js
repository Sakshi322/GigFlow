import Gig from "../models/Gig.model.js";

/* Create a new gig */
export const createGig = async (req, res) => {
  const { title, description, budget } = req.body;

  if (!title || !description || !budget) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const gig = await Gig.create({
    title,
    description,
    budget,
    ownerId: req.user._id,
  });

  res.status(201).json(gig);
};

/* Get all open gigs (with search) */
export const getGigs = async (req, res) => {
  const search = req.query.search || "";

  const gigs = await Gig.find({
    status: "open",
    title: { $regex: search, $options: "i" },
  }).sort({ createdAt: -1 });

  res.json(gigs);
};



/* Get gigs created by logged-in user */
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch my gigs" });
  }
};

