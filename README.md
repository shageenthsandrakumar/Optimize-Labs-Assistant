# Optimize Labs Assistant

Built in one day at the **Frontier AI Hacker House** (OnlyExit / localhost:nyc), Fordham
University, July 18 2026.

A two-sided AI companion for a doctor–patient relationship:

- **Doctors** pick a patient's conditions/medications and instantly see recent, *specifically
  relevant* medical research — not a generic search box, but an LLM explaining *why* each
  paper matters for that patient.
- **Patients** upload a prescription or document, get it read automatically (no manual
  transcription), and can ask an AI assistant questions about it.

Inspired by the architecture patterns of an existing medical-records RAG backend (document
ingestion → chunking → embeddings → RAG Q&A), but this is a **separate, standalone project** —
no code or data is shared with that system.

## Team

[Shageenth Sandrakumar](https://github.com/shageenthsandrakumar) (backend) ·
[aarushi-network](https://github.com/aarushi-network) (frontend)

## Structure

```
backend/    FastAPI service — PubMed search, LLM ranking, OCR, chat
frontend/   Vite + React + TypeScript UI
docs/       Task briefs used to split the build
```

## Architecture

```
                    ┌─────────────────────────────────────────┐
  React frontend    │              FastAPI backend             │
  (localhost:5173)  │              (localhost:8000)             │
                     │                                           │
  Doctor picks   ───►│ POST /api/research                       │
  patient            │   1. Build a PubMed query from            │
                     │      conditions + medications             │
                     │   2. esearch + efetch (NCBI E-utilities)   │
                     │   3. LLM scores relevance + writes a       │
                     │      patient-specific "why it matters"     │
                     │      (OpenRouter, openai/gpt-4o-mini)      │
                     │                                           │
  Patient uploads───►│ POST /api/scan                            │
  a document          │   - PDF  → pdfplumber native text        │
                      │   - Image → vision-LLM OCR (OpenRouter)   │
                      │                                           │
  Patient asks   ───►│ POST /api/chat                            │
  a question          │   - LLM reply, stuffing any uploaded      │
                       │     document text directly as context    │
                       │     (no RAG/vector DB — see Scope below) │
                     └─────────────────────────────────────────┘
```

All three endpoints call out to OpenRouter (`https://openrouter.ai/api/v1`) rather than the
OpenAI API directly — same `openai` Python SDK, just a different `base_url` + API key.

## API contract

### `POST /api/research`
```json
// Request
{ "conditions": ["Type 2 Diabetes"], "medications": ["Metformin"], "notes": "" }

// Response
{
  "query_terms": ["Type 2 Diabetes", "Metformin"],
  "matches": [
    {
      "source": "pubmed",
      "external_id": "PMID38568468",
      "title": "Metformin: Past, Present, and Future.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/38568468/",
      "published_date": "2024-Jun",
      "relevance_score": 1.0,
      "relevance_reasoning": "This paper reviews metformin, the patient's current medication..."
    }
  ]
}
```

### `POST /api/scan`
`multipart/form-data`, field name `file` (image or PDF).
```json
{
  "id": "9dc36f05-...",
  "fileName": "prescription.png",
  "uploadedAt": "2026-07-18T19:08:42.602375+00:00",
  "extractedText": "Rx: Metformin HCl 500 mg\n...",
  "status": "done"
}
```
`status` is `"error"` if OCR fails (e.g. a scanned, image-only PDF — see Scope below).

### `POST /api/chat`
```json
// Request
{ "message": "What are the side effects of metformin?", "context": [] }

// Response
{ "response": "Metformin commonly causes nausea, diarrhea..." }
```
`context` is an array of previously-extracted document texts (e.g. from `/api/scan`); if
present, it's included directly in the prompt so the assistant can answer questions about the
patient's specific records.

## Running locally

### Backend

Requires Python 3.11–3.13 (Python 3.14 currently fails to build `pydantic-core` from source
on Windows — no prebuilt wheel yet. If you hit that, use WSL/Linux, which has 3.12 by default).

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # or .venv\Scripts\activate on native Windows
pip install -r requirements.txt
cp .env.example .env           # fill in OPENROUTER_API_KEY
uvicorn main:app --reload --port 8000
```

`.env` variables:

| Variable | Required | Notes |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | From [openrouter.ai](https://openrouter.ai) |
| `OPENROUTER_MODEL` | No | Defaults to `openai/gpt-4o-mini` (used for ranking, OCR, and chat) |
| `NCBI_API_KEY` | No | Raises PubMed rate limit from 3/sec to 10/sec |

### Frontend

```bash
cd frontend
npm install
npm run dev     # http://localhost:5173
```

CORS on the backend is locked to `http://localhost:5173` — update
`app.add_middleware(CORSMiddleware, ...)` in `backend/main.py` if the frontend runs elsewhere.

## Scope for today's build

Deliberately cut to fit a one-day build — see [docs/frontend-task.md](docs/frontend-task.md)
for the original task brief:

- **One literature source** (PubMed). ClinicalTrials.gov trial-matching and Semantic Scholar
  are roadmap items, not built today.
- **No OCR system dependencies.** `/api/scan` uses a vision-capable LLM instead of
  Tesseract/Poppler — no binary installs, works for images out of the box. PDFs use
  `pdfplumber`'s native text layer only; **scanned/image-only PDFs aren't supported today**
  (would need `pdf2image` + Poppler, the exact setup risk we chose to avoid).
- **No RAG for chat.** `/api/chat` stuffs document text directly into the prompt rather than
  chunking/embedding into a vector DB — fine at demo scale (a handful of short documents per
  patient), would need real retrieval to scale to a full medical history.
- **No auth, no database.** Demo patients are hardcoded in the frontend; nothing persists
  across requests or page reloads.
- **Resilience over strictness for the demo:** each LLM-backed endpoint degrades gracefully
  (e.g. falls back to unranked-but-present results) rather than returning a 500 if OpenRouter
  or PubMed hiccups mid-demo.

## Roadmap (post-hackathon)

- ClinicalTrials.gov trial-matching + Semantic Scholar as additional research sources
- Proactive alerts: rerun research matching on a schedule, notify doctors of *new* relevant
  papers instead of only on-demand search
- Real document ingestion pipeline (OCR for scanned PDFs, chunking, embeddings) to support
  RAG chat over a patient's full document history
- Auth + persistence (patient/doctor accounts, saved research history, audit trail)
