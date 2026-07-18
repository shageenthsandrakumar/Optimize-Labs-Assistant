import { useNavigate } from "react-router-dom";
import type { UserRole } from "../../types";

interface HeaderProps {
  role: UserRole;
  userName: string;
}

export default function Header({ role, userName }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
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
        <h1 className="text-lg font-semibold text-slate-800">
          MedResearch Companion
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              role === "doctor"
                ? "bg-blue-100 text-blue-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {role === "doctor" ? "Doctor" : "Patient"}
          </span>
          <span className="text-sm text-slate-600">{userName}</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
