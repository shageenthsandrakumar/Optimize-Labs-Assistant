import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "../types";

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRole) return;
    navigate(`/${selectedRole}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            MedResearch Companion
          </h1>
          <p className="text-slate-500 mt-1">
            AI-powered medical research at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setSelectedRole("patient")}
            className={`p-5 rounded-xl border-2 transition-all text-center cursor-pointer ${
              selectedRole === "patient"
                ? "border-emerald-500 bg-emerald-50 shadow-md"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                selectedRole === "patient"
                  ? "bg-emerald-100"
                  : "bg-slate-100"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  selectedRole === "patient"
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <p className="font-semibold text-slate-700">Patient Login</p>
            <p className="text-xs text-slate-400 mt-1">
              Upload documents & chat
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("doctor")}
            className={`p-5 rounded-xl border-2 transition-all text-center cursor-pointer ${
              selectedRole === "doctor"
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                selectedRole === "doctor" ? "bg-blue-100" : "bg-slate-100"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  selectedRole === "doctor"
                    ? "text-blue-600"
                    : "text-slate-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="font-semibold text-slate-700">Doctor Login</p>
            <p className="text-xs text-slate-400 mt-1">
              Research & patient analysis
            </p>
          </button>
        </div>

        {selectedRole && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={
                  selectedRole === "doctor" ? "dr.smith" : "patient_a"
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter any password"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all cursor-pointer ${
                selectedRole === "doctor"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              Sign In as {selectedRole === "doctor" ? "Doctor" : "Patient"}
            </button>
            <p className="text-xs text-center text-slate-400">
              Demo mode — any credentials will work
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
