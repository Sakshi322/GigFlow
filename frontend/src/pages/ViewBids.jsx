import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBids, hireBid } from "../redux/slices/bidSlice";
import { useParams } from "react-router-dom";

const ViewBids = () => {
  const { gigId } = useParams();
  const dispatch = useDispatch();
  const { bids: originalBids, loading, error } = useSelector((state) => state.bids);

  const [bids, setBids] = useState([]);
  const [hiringBidId, setHiringBidId] = useState(null);

  useEffect(() => {
    setBids(originalBids);
  }, [originalBids]);

  useEffect(() => {
    dispatch(fetchBids(gigId));
  }, [dispatch, gigId]);

  const handleHire = async (bidId) => {
    try {
      setHiringBidId(bidId);
      await dispatch(hireBid(bidId)).unwrap();

      // Update local bids state
      setBids((prevBids) =>
        prevBids.map((bid) => {
          if (bid._id === bidId) return { ...bid, status: "hired" };
          if (bid.status === "pending") return { ...bid, status: "rejected" };
          return bid;
        })
      );
    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setHiringBidId(null);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (bids.length === 0) return <p>No bids yet</p>;

  // Check if a bid is already hired
  const isGigAssigned = bids.some((b) => b.status === "hired");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bids for Your Gig</h1>

      {loading && <p className="text-gray-500">Updating bids...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className={`border p-4 rounded shadow transition-all duration-300
              ${bid.status === "rejected" ? "bg-gray-100 opacity-70" : ""}
              ${bid.status === "hired" ? "bg-green-50" : ""}
            `}
          >
            <p>
              <strong>Freelancer:</strong> {bid.freelancerId.name}
            </p>
            <p>
              <strong>Email:</strong> {bid.freelancerId.email}
            </p>
            <p>
              <strong>Amount:</strong> ₹{bid.amount}
            </p>
            <p>
              <strong>Proposal:</strong>{" "}
              <span className={bid.status === "rejected" ? "line-through" : ""}>
                {bid.proposal}
              </span>
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  bid.status === "hired"
                    ? "text-green-600 font-semibold"
                    : bid.status === "rejected"
                    ? "text-red-600 font-semibold"
                    : "text-gray-600"
                }
              >
                {bid.status}
              </span>
            </p>

            {/* Show Hire button only if bid is pending AND no bid is hired */}
            {bid.status === "pending" && !isGigAssigned && (
              <button
                disabled={hiringBidId === bid._id}
                onClick={() => handleHire(bid._id)}
                className={`mt-3 px-4 py-2 rounded text-white ${
                  hiringBidId === bid._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {hiringBidId === bid._id ? "Hiring..." : "Hire"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBids;
