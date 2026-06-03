import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [programId, setProgramId] = useState("");
  const [stakeholderId, setStakeholderId] = useState("");
  const [status, setStatus] = useState("Present");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance");
      setAttendance(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const markAttendance = async (e) => {
    e.preventDefault();

    try {
      await api.post("/attendance", {
        program_id: programId,
        stakeholder_id: stakeholderId,
        status,
      });

      Swal.fire(
        "Success",
        "Attendance marked successfully",
        "success"
      );

      setProgramId("");
      setStakeholderId("");
      setStatus("Present");

      fetchAttendance();

    } catch (error) {

      Swal.fire(
        "Error",
        error.response?.data?.error ||
          "Failed to mark attendance",
        "error"
      );

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-3">
          Attendance Management
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

        {user?.role === "Admin" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">

            <h2 className="text-xl font-semibold mb-4">
              Mark Attendance
            </h2>

            <form
              onSubmit={markAttendance}
              className="grid md:grid-cols-4 gap-4"
            >

              <input
                type="number"
                placeholder="Program ID"
                value={programId}
                onChange={(e) =>
                  setProgramId(e.target.value)
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Stakeholder ID"
                value={stakeholderId}
                onChange={(e) =>
                  setStakeholderId(e.target.value)
                }
                className="border p-2 rounded"
                required
              />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="border p-2 rounded"
              >
                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>
              </select>

              <button
                type="submit"
                className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
              >
                Mark Attendance
              </button>

            </form>

          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-green-700 text-white">

              <tr>
                <th className="p-3 text-left">
                  ID
                </th>

                <th className="p-3 text-left">
                  Program ID
                </th>

                <th className="p-3 text-left">
                  Stakeholder ID
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {attendance.map((record) => (

                <tr
                  key={record.id}
                  className="border-b"
                >

                  <td className="p-3">
                    {record.id}
                  </td>

                  <td className="p-3">
                    {record.program_id}
                  </td>

                  <td className="p-3">
                    {record.stakeholder_id}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded text-white ${
                        record.status === "Present"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {record.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {attendance.length === 0 && (
            <p className="p-4 text-gray-500">
              No attendance records found.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}