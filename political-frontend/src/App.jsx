import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Programs from "./pages/Programs";
import Stakeholders from "./pages/Stakeholders";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Programs */}
          <Route
            path="/programs"
            element={
              <ProtectedRoute>
                <Programs />
              </ProtectedRoute>
            }
          />

          {/* Stakeholders */}
          <Route
            path="/stakeholders"
            element={
              <ProtectedRoute>
                <Stakeholders />
              </ProtectedRoute>
            }
          />

          {/* Attendance */}
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}