import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import bidRoutes from "./routes/bid.routes.js";








const app = express();

/* -------------------- MIDDLEWARES -------------------- */

// Allow frontend to talk to backend
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // allow cookies
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

/* -------------------- TEST ROUTE -------------------- */
app.use("/api/auth", authRoutes);

app.use("/api/gigs", gigRoutes);

app.use("/api/bids", bidRoutes);

app.get("/", (req, res) => {
  res.json({ message: "GigFlow API running" });
});

export default app;
