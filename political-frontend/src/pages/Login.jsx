import { useState, useContext } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", form);

      login(res.data);

      Swal.fire("Success", "Login successful", "success");

      navigate("/dashboard");

    } catch (err) {
      Swal.fire("Error", "Invalid credentials", "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded w-96"
      >

        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          className="w-full p-2 border mb-3 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="w-full p-2 border mb-3 rounded"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
          Login
        </button>

        {/* Register link */}
        <p className="text-sm text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}