// import { useState } from "react";
// import { useDispatch } from "react-redux";
// // import { createBid } from "../redux/slices/bidSlice";

// const BidForm = ({ gigId }) => {
//   const dispatch = useDispatch();
//   const [amount, setAmount] = useState("");
//   const [proposal, setProposal] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await dispatch(
//         createBid({ gigId, amount, proposal })
//       ).unwrap();

//       setAmount("");
//       setProposal("");
//       alert("Bid submitted successfully");
//     } catch (err) {
//       alert(err || "Failed to submit bid");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-4">
//       <input
//         type="number"
//         placeholder="Bid Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="border p-2 rounded w-full mb-2"
//         required
//       />

//       <textarea
//         placeholder="Proposal"
//         value={proposal}
//         onChange={(e) => setProposal(e.target.value)}
//         className="border p-2 rounded w-full mb-2"
//         required
//       />

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Submit Bid
//       </button>
//     </form>
//   );
// };

// export default BidForm;
