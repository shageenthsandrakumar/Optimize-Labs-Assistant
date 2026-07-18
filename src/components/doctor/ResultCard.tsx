import type { Match } from "../../types";

interface ResultCardProps {
  match: Match;
}

function scoreColor(score: number): string {
  if (score >= 0.9) return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (score >= 0.8) return "bg-teal-100 text-teal-700 border-teal-200";
  return "bg-amber-100 text-amber-700 border-amber-200";
}

export default function ResultCard({ match }: ResultCardProps) {
  const pct = Math.round(match.relevance_score * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 leading-snug mb-3">
          {match.title}
        </h3>

        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-4 mb-4">
          <p className="text-xs font-medium text-blue-500 uppercase tracking-wider mb-1">
            Why this matters
          </p>
          <p className="text-slate-700 leading-relaxed">
            {match.relevance_reasoning}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded-full border border-violet-200 uppercase">
            {match.source}
          </span>
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full border ${scoreColor(
              match.relevance_score
            )}`}
          >
            {pct}% relevant
          </span>
          <span className="text-xs text-slate-400">
            {match.published_date}
          </span>
          <span className="text-xs text-slate-300">
            {match.external_id}
          </span>
          <a
            href={match.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors flex items-center gap-1"
          >
            View source
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
