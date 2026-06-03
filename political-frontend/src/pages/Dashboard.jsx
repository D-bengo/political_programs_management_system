import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.name}
        </h1>

        <p className="text-gray-600 mb-6">
          Political Programs Management System Dashboard
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">Programs</h2>
            <p className="text-2xl font-bold">12</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">Stakeholders</h2>
            <p className="text-2xl font-bold">34</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-gray-500">Attendance Records</h2>
            <p className="text-2xl font-bold">89</p>
          </div>
        </div>

        <div className="mt-6 bg-white p-5 rounded shadow">
          <h2 className="text-lg font-bold mb-3">
            User Information
          </h2>

          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p className="mt-2">
            <strong>Role:</strong>

            <span
              className={`ml-2 px-3 py-1 rounded text-white ${
                user?.role === "Admin"
                  ? "bg-red-600"
                  : "bg-blue-600"
              }`}
            >
              {user?.role}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}