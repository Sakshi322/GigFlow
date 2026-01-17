import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGigs } from "../redux/slices/gigsSlice";
import GigCard from "../components/GigCard";

const MyGigs = () => {
  const dispatch = useDispatch();
  const { gigs, loading, error } = useSelector((state) => state.gigs);

  useEffect(() => {
    dispatch(fetchMyGigs());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Gigs</h1>

      {gigs.length === 0 && <p>No gigs created yet</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} showOwnerActions />
        ))}
      </div>
    </div>
  );
};

export default MyGigs;
