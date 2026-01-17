import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import socket from "../socket";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ Save token and user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
           
      // Redirect after login
      navigate("/dashboard");
       window.location.reload();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Check credentials"
      );
    }


    // Connect socket after login
socket.connect();

// Send userId to backend
socket.emit("join", res.data.user._id);

  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="bg-black text-white w-full p-2">
        Login
      </button>

      <p className="text-sm mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
