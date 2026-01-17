import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate("/dashboard"); // redirect after success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-full p-2"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
