import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function Programs() {
  const [programs, setPrograms] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [coordinatorId, setCoordinatorId] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPrograms = async () => {
    try {
      const res = await api.get("/programs");
      setPrograms(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/programs", {
        title,
        description,
        venue,
        region,
        status,
        coordinator_id: coordinatorId
      });

      Swal.fire(
        "Success",
        "Program created successfully",
        "success"
      );

      setTitle("");
      setDescription("");
      setVenue("");
      setRegion("");
      setStatus("Scheduled");
      setCoordinatorId("");

      fetchPrograms();

    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        error.response?.data?.error ||
          "Failed to create program",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-4">
          Programs Management
        </h1>

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

        {/* Admin Only Form */}
        {user?.role === "Admin" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">

            <h2 className="text-xl font-semibold mb-4">
              Create Program
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >

              <input
                type="text"
                placeholder="Program Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="border p-3 rounded"
                required
              />

              <input
                type="text"
                placeholder="Venue"
                value={venue}
                onChange={(e) =>
                  setVenue(e.target.value)
                }
                className="border p-3 rounded"
                required
              />

              <input
                type="text"
                placeholder="Region"
                value={region}
                onChange={(e) =>
                  setRegion(e.target.value)
                }
                className="border p-3 rounded"
                required
              />

              <input
                type="number"
                placeholder="Coordinator ID"
                value={coordinatorId}
                onChange={(e) =>
                  setCoordinatorId(e.target.value)
                }
                className="border p-3 rounded"
                required
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="border p-3 rounded"
              >
                <option value="Scheduled">
                  Scheduled
                </option>

                <option value="Ongoing">
                  Ongoing
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="border p-3 rounded md:col-span-2"
                rows="4"
                required
              />

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded md:col-span-2"
              >
                Create Program
              </button>

            </form>

          </div>
        )}

        {/* Programs Table */}

        <div className="bg-white rounded-lg shadow overflow-hidden">

          <div className="bg-blue-900 text-white p-4">
            <h2 className="font-semibold">
              All Programs
            </h2>
          </div>

          {programs.length === 0 ? (
            <p className="p-6 text-gray-500">
              No programs found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-200">

                  <tr>
                    <th className="p-3 text-left">
                      ID
                    </th>

                    <th className="p-3 text-left">
                      Title
                    </th>

                    <th className="p-3 text-left">
                      Venue
                    </th>

                    <th className="p-3 text-left">
                      Region
                    </th>

                    <th className="p-3 text-left">
                      Status
                    </th>

                    <th className="p-3 text-left">
                      Coordinator
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {programs.map((program) => (

                    <tr
                      key={program.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3">
                        {program.id}
                      </td>

                      <td className="p-3">
                        {program.title}
                      </td>

                      <td className="p-3">
                        {program.venue}
                      </td>

                      <td className="p-3">
                        {program.region}
                      </td>

                      <td className="p-3">

                        <span
                          className={`px-3 py-1 rounded text-white ${
                            program.status === "Completed"
                              ? "bg-green-600"
                              : program.status === "Ongoing"
                              ? "bg-yellow-500"
                              : "bg-blue-600"
                          }`}
                        >
                          {program.status}
                        </span>

                      </td>

                      <td className="p-3">
                        {program.coordinator_id}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}