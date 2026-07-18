# Optimize Labs Assistant

A doctor-facing research companion: pick a patient, see recent medical research relevant to
their specific conditions and medications, with an LLM explaining *why* each result matters —
not just a search box.

Built in one day at the Frontier AI Hacker House (OnlyExit / localhost:nyc), July 18 2026.

Inspired by the architecture patterns of an existing medical-records RAG backend (document
ingestion → chunking → embeddings → RAG Q&A), but this is a **separate, standalone project** —
no code or data is shared with that system.

## Structure

```
backend/    FastAPI service: PubMed search + LLM relevance ranking → /api/research
frontend/   Vite + React + TypeScript UI: patient selector + research results
```

## Scope for today's build

- Single data source: PubMed (E-utilities). ClinicalTrials.gov and Semantic Scholar are
  roadmap items, not built today.
- No auth, no database — demo patients are hardcoded, nothing is persisted.
- Backend and frontend run locally for the demo; see each folder's README for setup.

## Team

Optimize Labs Assistant — [Shageenth Sandrakumar](https://github.com/shageenthsandrakumar),
[aarushi-network](https://github.com/aarushi-network)
