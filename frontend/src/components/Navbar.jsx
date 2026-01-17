import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">
        <Link to="/">GigFlow</Link>
      </h1>

      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create-gig">Create Gig</Link>
            <Link to="/my-gigs">My Gigs</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
