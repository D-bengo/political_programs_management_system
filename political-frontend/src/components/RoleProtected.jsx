import { Navigate } from "react-router-dom";

export default function RoleProtected({
  children,
  allowedRoles,
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">
          Access Denied
        </h1>
      </div>
    );
  }

  return children;
}