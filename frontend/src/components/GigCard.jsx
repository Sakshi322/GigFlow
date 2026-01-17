import { Link } from "react-router-dom";

const GigCard = ({ gig, showOwnerActions }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-semibold text-lg">{gig.title}</h2>
      <p>{gig.description}</p>
      <p className="font-bold mt-2">₹{gig.budget}</p>

      {showOwnerActions && (
        <Link
          to={`/gigs/${gig._id}/bids`}
          className="text-blue-600 underline mt-2 block"
        >
          View Bids
        </Link>
      )}
    </div>
  );
};

export default GigCard;
