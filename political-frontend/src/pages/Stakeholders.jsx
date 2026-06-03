import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function Stakeholders() {
  const [stakeholders, setStakeholders] = useState([]);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [county, setCounty] = useState("");
  const [phone, setPhone] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // FETCH ALL STAKEHOLDERS
  const fetchStakeholders = async () => {
    try {
      const res = await api.get("/stakeholders");
      setStakeholders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStakeholders();
  }, []);

  // CREATE STAKEHOLDER (ADMIN ONLY)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/stakeholders", {
        name,
        position,
        county,
        phone,
      });

      Swal.fire(
        "Success",
        "Stakeholder added successfully",
        "success"
      );

      // reset form
      setName("");
      setPosition("");
      setCounty("");
      setPhone("");

      fetchStakeholders();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.error ||
          "Failed to add stakeholder",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-3">
          Stakeholder Management
        </h1>

        {/* ROLE BADGE */}
        <div className="mb-6">
          <span
            className={`px-3 py-1 rounded text-white ${
              user?.role === "Admin"
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
          >
            {user?.role}
          </span>
        </div>

        {/* ADMIN FORM ONLY */}
        {user?.role === "Admin" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">

            <h2 className="text-xl font-semibold mb-4">
              Add Stakeholder
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-4 gap-4"
            >

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) =>
                  setPosition(e.target.value)
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="County"
                value={county}
                onChange={(e) =>
                  setCounty(e.target.value)
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="border p-2 rounded"
                required
              />

              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 md:col-span-4"
              >
                Add Stakeholder
              </button>

            </form>

          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-900 text-white">

              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Position</th>
                <th className="p-3 text-left">County</th>
                <th className="p-3 text-left">Phone</th>
              </tr>

            </thead>

            <tbody>

              {stakeholders.map((s) => (

                <tr
                  key={s.id}
                  className="border-b"
                >

                  <td className="p-3">{s.id}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.position}</td>
                  <td className="p-3">{s.county}</td>
                  <td className="p-3">{s.phone}</td>

                </tr>

              ))}

            </tbody>

          </table>

          {stakeholders.length === 0 && (
            <p className="p-4 text-gray-500">
              No stakeholders found.
            </p>
          )}

        </div>

      </div>
    </div>
  );
}