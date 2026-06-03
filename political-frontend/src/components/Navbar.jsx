import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    Swal.fire("Logged out", "See you again!", "success");

    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">

      <h1 className="font-bold text-lg">
        PPMS System
      </h1>

      <div className="space-x-4">

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/stakeholders">Stakeholders</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/reports">Reports</Link>
  
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}