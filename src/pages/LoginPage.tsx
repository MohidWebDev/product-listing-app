import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username || "Admin"); // mock auth, no backend
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Log In
      </button>
    </form>
  );
}
