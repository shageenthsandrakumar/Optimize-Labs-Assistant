# Optimize Labs Assistant

Built in one day at the **Frontier AI Hacker House** (OnlyExit / localhost:nyc), Fordham
University, July 18 2026.

A two-sided AI companion for a doctor–patient relationship:

- **Doctors** log in, pick a patient from a roster, see a clinical summary, ask a clinical
  assistant questions grounded in that patient's record, and pull up recent medical research
  specifically relevant to that patient's conditions/medications — with an LLM explaining
  *why* each result matters, not just a search box.
- **Patients** log in, upload a prescription or document, get it read automatically (no manual
  transcription), and can ask a health assistant questions.

Inspired by the architecture patterns of an existing medical-records RAG backend (document
ingestion → chunking → embeddings → RAG Q&A), but this is a **separate, standalone project** —
no code or data is shared with that system.

## Team

[Shageenth Sandrakumar](https://github.com/shageenthsandrakumar) ·
[aarushi-network](https://github.com/aarushi-network)

## Structure

```
backend/    FastAPI service — PubMed search, LLM ranking, OCR, chat
src/        React + TypeScript frontend (Vite), at repo root
docs/       Original task brief used to split the build (see note below)
```

> `docs/frontend-task.md` is the brief the frontend was originally scoped from — the frontend
> ended up living at the repo root instead of `frontend/`, and grew a login flow, patient
> roster, and clinical summary view beyond that brief. Treat the doc as historical context for
> *why* things are shaped the way they are, not as the literal current structure.

## Architecture

```
  React frontend (localhost:5173)          FastAPI backend (localhost:8000)

  Doctor login → pick patient  ─────────►  POST /api/research
  from roster → "Find Relevant                1. Build a PubMed query from
  Research"                                      conditions + medications
                                                2. esearch + efetch (NCBI E-utilities)
                                                3. LLM scores relevance + writes a
                                                   patient-specific "why it matters"

  Doctor asks the Clinical     ─────────►  POST /api/doctor-chat
  Assistant a question                        Clinical-toned reply grounded in the
                                                patient's conditions/medications

  Patient login → uploads      ─────────►  POST /api/scan
  a document                                   - PDF   → pdfplumber native text
                                                - Image → vision-LLM OCR

  Patient asks the Health      ─────────►  POST /api/chat
  Assistant a question                         LLM reply, stuffing any uploaded
                                                document text directly as context
                                                (no RAG/vector DB — see Scope below)
```

All four LLM-backed endpoints call OpenRouter (`https://openrouter.ai/api/v1`) rather than the
OpenAI API directly — same `openai` Python SDK, just a different `base_url` + API key. Each
degrades gracefully (falls back rather than 500s) if OpenRouter or PubMed hiccups mid-demo.

Login is **demo-mode only** — any username/password combination signs you in as that role.
There's no real auth, no session persistence, and no backend involvement in login at all.

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

### `POST /api/doctor-chat`
```json
// Request
{
  "message": "What should I watch for with this patient?",
  "patient_id": "p3",
  "conditions": ["Chronic Kidney Disease, Stage 3", "Type 2 Diabetes"],
  "medications": ["Metformin", "Empagliflozin"],
  "context": []
}

// Response
{ "response": "For this patient with Stage 3 CKD and Type 2 Diabetes, monitor..." }
```
Same response shape as `/api/chat`, but the system prompt uses clinical language and the reply
is grounded in `conditions`/`medications` (not just the raw message) — added mid-build once the
frontend's Clinical Assistant needed a backend endpoint that didn't exist yet.

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
present, it's included directly in the prompt. Today the patient-side chat UI doesn't actually
wire scanned-document text into `context` yet — see Roadmap.

## Running locally

### Backend

Requires Python 3.11–3.13. **Python 3.14 fails to build `pydantic-core` from source on
Windows** (no prebuilt wheel yet, and compiling needs a Rust toolchain) — if `pip install` hits
that, use WSL instead, which ships Python 3.12 by default and doesn't have this problem. This
project's backend was developed and runs in WSL for exactly this reason.

```bash
cd backend
python -m venv .venv          # or python3 -m venv .venv on WSL/Linux
source .venv/bin/activate     # or .venv\Scripts\activate on native Windows
pip install -r requirements.txt
cp .env.example .env          # fill in OPENROUTER_API_KEY
uvicorn main:app --port 8000
```

Skip `--reload` if you're running the backend from WSL against files on the Windows filesystem
(`/mnt/c/...`) — WSL's file watcher often misses changes written from the Windows side, so
`--reload` silently doesn't reload and you'll be testing stale code. Restart manually instead
after edits.

`.env` variables:

| Variable | Required | Notes |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | From [openrouter.ai](https://openrouter.ai) |
| `OPENROUTER_MODEL` | No | Defaults to `openai/gpt-4o-mini` (used for ranking, OCR, and both chat endpoints) |
| `NCBI_API_KEY` | No | Raises PubMed rate limit from 3/sec to 10/sec |

### Frontend

Runs from the **repo root** (not a subfolder):

```bash
npm install
npm run dev     # http://localhost:5173
```

CORS on the backend is locked to `http://localhost:5173` — update
`app.add_middleware(CORSMiddleware, ...)` in `backend/main.py` if the frontend runs elsewhere.

## Scope for today's build

- **One literature source** (PubMed). ClinicalTrials.gov trial-matching and Semantic Scholar
  are roadmap items, not built today.
- **No OCR system dependencies.** `/api/scan` uses a vision-capable LLM instead of
  Tesseract/Poppler — no binary installs, works for images out of the box. PDFs use
  `pdfplumber`'s native text layer only; **scanned/image-only PDFs aren't supported today**
  (would need `pdf2image` + Poppler, the exact setup risk we chose to avoid).
- **No RAG for chat.** Both chat endpoints stuff text directly into the prompt rather than
  chunking/embedding into a vector DB — fine at demo scale, would need real retrieval to scale
  to a full medical history.
- **No auth, no database.** Login is demo-mode (any credentials work); demo patients and their
  clinical summaries are hardcoded on the frontend; nothing persists across requests or page
  reloads.
- **Resilience over strictness for the demo:** each LLM-backed endpoint degrades gracefully
  (e.g. falls back to unranked-but-present results, or a friendly error message) rather than
  returning a 500 if OpenRouter or PubMed hiccups mid-demo.

## Roadmap (post-hackathon)

- ClinicalTrials.gov trial-matching + Semantic Scholar as additional research sources
- Wire scanned-document text into the patient chat's `context` so it can actually answer
  questions about an uploaded prescription
- Proactive alerts: rerun research matching on a schedule, notify doctors of *new* relevant
  papers instead of only on-demand search
- Real document ingestion pipeline (OCR for scanned PDFs, chunking, embeddings) to support
  RAG chat over a patient's full document history
- Real auth + persistence (patient/doctor accounts, saved research history, audit trail)
