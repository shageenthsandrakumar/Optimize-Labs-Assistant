interface ResearchButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function ResearchButton({
  onClick,
  disabled,
  loading,
}: ResearchButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white transition-all cursor-pointer ${
        disabled
          ? "bg-slate-300 cursor-not-allowed"
          : "bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg"
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Searching...
        </span>
      ) : (
        "Find Relevant Research"
      )}
    </button>
  );
}
