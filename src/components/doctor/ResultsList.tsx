import type { ResearchResponse } from "../../types";
import ResultCard from "./ResultCard";

interface ResultsListProps {
  data: ResearchResponse;
}

export default function ResultsList({ data }: ResultsListProps) {
  const sorted = [...data.matches].sort(
    (a, b) => b.relevance_score - a.relevance_score
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          Research Results
        </h2>
        <p className="text-sm text-slate-400">
          {sorted.length} studies found
        </p>
      </div>
      <div className="space-y-4">
        {sorted.map((match) => (
          <ResultCard key={match.external_id} match={match} />
        ))}
      </div>
    </div>
  );
}
