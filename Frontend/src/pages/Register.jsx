import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";


const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(form);
      setUser(data.user);
      navigate("/todos"); // Redirect to the Todo page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="body">
      <Navbar />
      <div className="p-6 max-w-md mx-auto mt-10 bg-[#6c6c6c57] shadow-md rounded-md shadow-black">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border-[1.5px] rounded mb-2 text-lg text-white border-black focus:outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border-[1.5px] rounded mb-2 text-lg text-white border-black focus:outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border-[1.5px] rounded mb-2 text-lg text-white border-black focus:outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
        <p className="mt-4 text-base">
          Already have an account?
          <a href="/login" className="text-[#0009ff] hover:underline ml-2 ">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
