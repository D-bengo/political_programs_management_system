import { useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Coordinator"
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/register", form);

      Swal.fire("Success", "Account created successfully", "success");

      navigate("/login");

    } catch (err) {
      Swal.fire("Error", "Registration failed", "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={submit}
        className="bg-white p-6 shadow-lg rounded w-96"
      >

        <h2 className="text-2xl font-bold text-center mb-4">
          Register
        </h2>

        <input
          className="w-full p-2 border mb-3 rounded"
          placeholder="Full Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full p-2 border mb-3 rounded"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full p-2 border mb-3 rounded"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          className="w-full p-2 border mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option>Coordinator</option>
          <option>Admin</option>
        </select>

        <button className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700">
          Create Account
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}