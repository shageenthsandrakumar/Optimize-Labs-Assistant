# Frontend Task — Doctor Research Companion (Hackathon Build)

## Context
We're building a one-day hackathon project (Frontier AI Hacker House, judged by VCs): a tool
that lets a doctor pick a patient and instantly see recent medical research relevant to that
patient's specific conditions/medications, with an LLM explaining *why* each result matters —
not just a search box. Backend teammate is building the real pipeline (PubMed search + LLM
ranking) in parallel. **Your job: build the entire frontend against a mock API response that
matches an agreed contract, so you never have to wait on the backend.** Swapping mock data for
the real backend call at the end should take one line of code.

Time budget: **~2 hours**, then 30 min integration with the real backend.

## Tech stack
Use **Vite + React + TypeScript + Tailwind CSS**, scaffolded inside this repo's `frontend/`
folder. Fast to scaffold, no backend framework needed, easy to wire a single `fetch()` call in
later.

```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## The API contract (this is fixed — build to this exactly)

**Request** (what you'll eventually send):
```json
{
  "conditions": ["Type 2 Diabetes", "Hypertension"],
  "medications": ["Metformin", "Lisinopril"],
  "notes": ""
}
```

**Response** (what you render):
```json
{
  "query_terms": ["type 2 diabetes", "metformin", "hypertension"],
  "matches": [
    {
      "source": "pubmed",
      "external_id": "PMID12345",
      "title": "Cardiovascular Outcomes of Metformin in Patients with Comorbid Hypertension",
      "url": "https://pubmed.ncbi.nlm.nih.gov/12345",
      "published_date": "2026-05-01",
      "relevance_score": 0.91,
      "relevance_reasoning": "This 2026 study directly evaluates metformin's cardiovascular risk profile in patients with comorbid hypertension — matches this patient's exact medication and condition combination."
    }
  ]
}
```

## What to build

1. **Patient selector** — 2-3 hardcoded demo patients (see starter data below), shown as
   selectable cards or a dropdown. Each has a label/name, conditions, medications.
2. **"Find Relevant Research" button** — triggers the (mocked, for now) research call for the
   selected patient.
3. **Loading state** — this call will feel slow once it's real (live API calls + an LLM call
   chained together), so make the loading state good: skeleton cards or a progress message,
   not just a spinner. Simulate ~2-3s delay in the mock so you're designing for the real
   latency now.
4. **Results list** — one card per match: title, source badge (e.g. "PubMed"), published date,
   relevance score (small badge, e.g. "91% relevant" or a subtle bar), the relevance reasoning
   text (this is the most important part of each card — make it prominent, not an afterthought),
   and a "View source →" link using `url`.
5. **Empty state** — before a patient is selected / before the button is clicked.
6. **Error state** — if the fetch fails (won't happen with mock data, but stub it for when we
   swap to the real endpoint).

## Design guidance
This is health data being shown to VC judges — go for clean and clinically trustworthy, not
flashy. Calm colors, clear hierarchy (title → why it matters → metadata), generous whitespace.
Avoid anything that looks like a generic search-results page — the relevance reasoning per
result is the actual product; the UI should make that the visual focus, not bury it under the
title/link.

## Starter demo patients (suggested — swap or refine if you have time)
```ts
const DEMO_PATIENTS = [
  {
    id: "p1",
    label: "Patient A — 58M",
    conditions: ["Type 2 Diabetes", "Hypertension"],
    medications: ["Metformin", "Lisinopril"],
  },
  {
    id: "p2",
    label: "Patient B — 45F",
    conditions: ["Rheumatoid Arthritis"],
    medications: ["Methotrexate"],
  },
  {
    id: "p3",
    label: "Patient C — 67M",
    conditions: ["Chronic Kidney Disease, Stage 3", "Type 2 Diabetes"],
    medications: ["Metformin", "Empagliflozin"],
  },
];
```
If time allows, sanity-check these against real PubMed yourself (search the condition +
medication terms) so we know the live demo will return results that actually look impressive,
not empty or irrelevant.

## Integration point — keep this isolated
Put the data-fetching in **one function**, e.g. `src/api/fetchResearch.ts`:

```ts
export async function fetchResearch(patient: {
  conditions: string[];
  medications: string[];
  notes?: string;
}): Promise<ResearchResponse> {
  // MOCK — replace body with a real fetch() when backend is ready:
  // const res = await fetch("http://localhost:8000/api/research", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(patient),
  // });
  // return res.json();

  await new Promise((r) => setTimeout(r, 2000)); // simulate latency
  return MOCK_RESPONSE; // hardcode a realistic response matching the contract above
}
```
Everything else in the app calls this function and shouldn't need to change when we swap it.

## Explicitly out of scope (don't build these today)
- No auth/login
- No ClinicalTrials.gov or Semantic Scholar UI — at most a small greyed-out "Trial matching —
  coming soon" note if you have spare time, not required
- No database/persistence — state can live in React state, nothing needs to survive a refresh
- No multi-page routing — single page is fine

## Definition of done
- Select a demo patient → click "Find Relevant Research" → see loading state → see 3-6 result
  cards with title, source, date, relevance score, and (most importantly) the relevance
  reasoning text, each linking out to the source.
- Swapping mock data for the real backend endpoint requires editing only
  `fetchResearch.ts`.
