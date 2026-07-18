export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-slate-600 mb-2">
        Ready to search
      </h3>
      <p className="text-slate-400 max-w-md mx-auto">
        Select a patient above and click "Find Relevant Research" to discover
        the latest studies relevant to their conditions and medications.
      </p>
    </div>
  );
}
