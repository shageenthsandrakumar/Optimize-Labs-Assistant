export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <svg
          className="animate-spin h-5 w-5 text-teal-600"
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
        <p className="text-sm text-teal-700 font-medium">
          Searching PubMed and analyzing relevance...
        </p>
      </div>

      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse"
        >
          <div className="h-5 bg-slate-200 rounded w-3/4 mb-4" />
          <div className="bg-slate-100 rounded-lg p-4 mb-4">
            <div className="h-4 bg-slate-200 rounded w-full mb-2" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
          <div className="flex gap-3">
            <div className="h-6 bg-slate-200 rounded-full w-16" />
            <div className="h-6 bg-slate-200 rounded-full w-24" />
            <div className="h-6 bg-slate-200 rounded-full w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
