import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user}! This page is protected.</p>
      <button
        onClick={logout}
        className="bg-rose-600 text-white px-4 py-2 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
