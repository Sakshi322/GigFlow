import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitBid } from "../redux/slices/bidSlice";
import { useParams, Link } from "react-router-dom";

const GigDetails = () => {
  const { gigId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.bids);

  const [amount, setAmount] = useState("");
  const [proposal, setProposal] = useState("");

  // Only freelancers can see bid form
  if (!user) {
    return (
      <div className="p-6 text-center">
        <p>Please login to place a bid</p>
        <Link to="/login" className="text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  if (user.role !== "freelancer") {
    return (
      <div className="p-6 text-center text-gray-600">
        Only freelancers can place bids on gigs.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(submitBid({ gigId, amount, proposal })).unwrap();
      setAmount("");
      setProposal("");
      alert("Bid submitted successfully");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Your Bid</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Bid Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Write your proposal"
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Bid"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default GigDetails;
