import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function Reports() {
  const [reports, setReports] = useState([]);

  const [programId, setProgramId] = useState("");
  const [summary, setSummary] = useState("");
  const [recommendations, setRecommendations] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");

      setReports(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/reports", {
        summary,
        recommendations,
        program_id: programId,
      });

      Swal.fire(
        "Success",
        "Report submitted successfully",
        "success"
      );

      setProgramId("");
      setSummary("");
      setRecommendations("");

      fetchReports();

    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        error.response?.data?.error ||
          "Failed to submit report",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-4">
          Reports Management
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

        {/* Coordinator Only */}
        {user?.role === "Coordinator" && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">

            <h2 className="text-xl font-semibold mb-4">
              Submit Report
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="number"
                placeholder="Program ID"
                value={programId}
                onChange={(e) =>
                  setProgramId(
                    e.target.value
                  )
                }
                className="w-full border rounded p-3"
                required
              />

              <textarea
                rows="5"
                placeholder="Report Summary"
                value={summary}
                onChange={(e) =>
                  setSummary(
                    e.target.value
                  )
                }
                className="w-full border rounded p-3"
                required
              />

              <textarea
                rows="5"
                placeholder="Recommendations"
                value={recommendations}
                onChange={(e) =>
                  setRecommendations(
                    e.target.value
                  )
                }
                className="w-full border rounded p-3"
                required
              />

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
              >
                Submit Report
              </button>

            </form>

          </div>
        )}

        {/* Reports List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">

          <div className="bg-blue-900 text-white p-4">
            <h2 className="font-semibold">
              Submitted Reports
            </h2>
          </div>

          {reports.length === 0 ? (
            <p className="p-6 text-gray-500">
              No reports found.
            </p>
          ) : (
            <div className="divide-y">

              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-5"
                >

                  <div className="mb-2">
                    <h3 className="font-bold text-lg">
                      Report #{report.id}
                    </h3>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-semibold">
                      Summary
                    </h4>

                    <p className="text-gray-700">
                      {report.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Recommendations
                    </h4>

                    <p className="text-gray-700">
                      {report.recommendations}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}