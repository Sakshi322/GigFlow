import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../redux/slices/gigsSlice";
import { Link } from "react-router-dom";
import socket from "../socket"; // 🔔 ADD THIS

const Dashboard = () => {
  const dispatch = useDispatch();
  const { gigs, loading, error } = useSelector((state) => state.gigs);

  const [notification, setNotification] = useState(null);

  /* FETCH GIGS */
  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  /* 🔔 REAL-TIME HIRE NOTIFICATION */
  useEffect(() => {
    socket.on("hired", (data) => {
      setNotification(
        `🎉 You have been hired for "${data.gigTitle}"!`
      );

      // Auto-hide after 6 seconds
      setTimeout(() => setNotification(null), 6000);
    });

    return () => {
      socket.off("hired");
    };
  }, []);

  if (loading) return <p>Loading gigs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {/* 🔔 NOTIFICATION */}
      {notification && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded shadow">
          {notification}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Gigs Feed</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gigs.map((gig) => (
          <div key={gig._id} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{gig.title}</h2>
            <p>{gig.description}</p>
            <p className="mt-2 font-bold">Budget: ${gig.budget}</p>
          </div>
        ))}
      </div>

      <Link to="/create-gig">
        <button className="bg-black text-white px-6 py-2 mt-10 rounded">
          Create Gig
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
