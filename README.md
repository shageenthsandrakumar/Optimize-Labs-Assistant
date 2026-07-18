# MedResearch Companion

A medical research companion tool built for the Frontier AI Hacker House hackathon. Doctors can search recent PubMed literature relevant to a patient's conditions and medications, with AI-generated explanations of why each study matters. Patients can upload prescriptions/documents for OCR extraction and chat with an AI health assistant.

## Tech Stack

- **Vite** (v8) — build tool and dev server
- **React** (v19) + **TypeScript** (v6) — UI framework
- **Tailwind CSS** (v4) — utility-first styling via `@tailwindcss/vite`
- **React Router** (v7) — client-side routing between login, doctor, and patient views

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at **http://localhost:5173**.

## Application Overview

The app has three views, accessed via a role-based login page:

### Login Page (`/`)

- Two role cards: **Patient Login** and **Doctor Login**
- Clicking a role reveals a mock login form (username/password — any credentials work)
- Routes to `/doctor` or `/patient` based on selection

### Doctor View (`/doctor`)

- **Patient Selector** — 3 hardcoded demo patients displayed as cards, each showing conditions (amber badges) and medications (blue badges)
- **"Find Relevant Research" button** — triggers a search for the selected patient
- **Loading State** — skeleton cards with pulse animation and a progress message ("Searching PubMed and analyzing relevance...")
- **Results List** — cards for each matching study, featuring:
  - Paper title
  - **"Why This Matters" box** — the AI-generated relevance reasoning, visually prominent with a blue left border and tinted background
  - Source badge (e.g., "PUBMED"), relevance score (e.g., "95% relevant"), publication date, and external ID
  - "View source" link to the original paper
- **Empty State** — shown before a patient is selected
- **Error State** — shown if the API call fails, with a "Try again" button

### Patient View (`/patient`)

Two-panel layout (side-by-side on desktop, stacked on mobile):

- **Left Panel — Document Scanner**
  - Drag-and-drop or click-to-upload zone (accepts images and PDFs)
  - Uploaded files appear in a list with processing status
  - Once "done", clicking a document expands to show the OCR-extracted text
- **Right Panel — Health Assistant Chatbot**
  - Chat interface with message bubbles (user right-aligned, assistant left-aligned)
  - Typing indicator animation while the assistant "thinks"
  - Responds to keyword-based questions about medications, conditions, side effects, appointments, etc.
  - Starts with a welcome message

## Project Structure

```
src/
├── api/                          # API integration layer (swap mocks for real endpoints here)
│   ├── fetchResearch.ts          # Doctor: PubMed research search
│   ├── scanDocument.ts           # Patient: document OCR
│   └── chatbot.ts                # Patient: RAG chatbot
│
├── data/                         # Mock data (used until backend is connected)
│   ├── patients.ts               # 3 demo patients
│   ├── mockResearchResponses.ts  # Per-patient research results (4-5 per patient)
│   ├── mockOcrResults.ts         # Sample OCR-extracted text (prescription, lab report, discharge summary)
│   └── mockChatResponses.ts      # Keyword-to-response map (~11 topics)
│
├── types/
│   └── index.ts                  # Shared TypeScript interfaces
│
├── pages/
│   ├── LoginPage.tsx             # Role selection + mock login form
│   ├── DoctorView.tsx            # Doctor dashboard
│   └── PatientView.tsx           # Patient dashboard
│
├── components/
│   ├── shared/
│   │   └── Header.tsx            # Top bar with app name, role badge, sign-out
│   ├── doctor/
│   │   ├── PatientSelector.tsx   # Patient card grid
│   │   ├── ResearchButton.tsx    # Search trigger button
│   │   ├── LoadingSkeleton.tsx   # Skeleton loading cards
│   │   ├── ResultCard.tsx        # Single research result card
│   │   ├── ResultsList.tsx       # Results container
│   │   ├── EmptyState.tsx        # Pre-search placeholder
│   │   └── ErrorState.tsx        # Error display with retry
│   └── patient/
│       ├── DocumentScanner.tsx   # File upload + OCR trigger
│       ├── DocumentList.tsx      # Uploaded documents with expandable extracted text
│       ├── ChatBot.tsx           # Chat UI with message list and input
│       └── ChatMessage.tsx       # Single chat bubble
│
├── App.tsx                       # Router setup
├── main.tsx                      # Entry point
└── index.css                     # Tailwind CSS import
```

## Demo Patients

| ID  | Label              | Conditions                                   | Medications                  |
| --- | ------------------ | -------------------------------------------- | ---------------------------- |
| p1  | Patient A — 58M    | Type 2 Diabetes, Hypertension                | Metformin, Lisinopril        |
| p2  | Patient B — 45F    | Rheumatoid Arthritis                         | Methotrexate                 |
| p3  | Patient C — 67M    | Chronic Kidney Disease Stage 3, Type 2 Diabetes | Metformin, Empagliflozin  |

## Chatbot Topics

The mock chatbot responds to questions containing these keywords:

| Keyword(s)                               | Topic                          |
| ---------------------------------------- | ------------------------------ |
| metformin                                | Metformin usage and side effects |
| lisinopril                               | Lisinopril (ACE inhibitor) info |
| methotrexate                             | Methotrexate for RA            |
| empagliflozin, jardiance                 | SGLT2 inhibitor info           |
| diabetes, blood sugar, glucose           | Diabetes management            |
| hypertension, blood pressure, bp         | Blood pressure management      |
| arthritis, joint, rheumatoid             | Rheumatoid arthritis info      |
| kidney, ckd, renal, egfr                 | Chronic kidney disease info    |
| side effect, side effects, symptoms      | Managing medication side effects |
| appointment, schedule, visit, doctor     | Scheduling guidance            |
| dosage, dose, how much, how often        | Dosage instructions            |

Any unrecognized question gets a fallback response suggesting valid topics.

## Backend Integration

The frontend is designed so that connecting to a real backend requires editing **only 3 files** — one per endpoint. Each file has the real `fetch()` call commented out:

| File                      | Endpoint              | Method | Content Type            |
| ------------------------- | --------------------- | ------ | ----------------------- |
| `src/api/fetchResearch.ts` | `POST /api/research` | JSON   | `application/json`      |
| `src/api/scanDocument.ts`  | `POST /api/scan`     | FormData | `multipart/form-data` |
| `src/api/chatbot.ts`       | `POST /api/chat`     | JSON   | `application/json`      |

The backend is expected to run at `http://localhost:8000` with CORS enabled for `http://localhost:5173`.

## API Contracts

### `POST /api/research`

**Request:**
```json
{
  "conditions": ["Type 2 Diabetes", "Hypertension"],
  "medications": ["Metformin", "Lisinopril"],
  "notes": ""
}
```

**Response:**
```json
{
  "query_terms": ["type 2 diabetes", "metformin", "hypertension"],
  "matches": [
    {
      "source": "pubmed",
      "external_id": "PMID12345",
      "title": "Paper title",
      "url": "https://pubmed.ncbi.nlm.nih.gov/12345",
      "published_date": "2026-05-01",
      "relevance_score": 0.91,
      "relevance_reasoning": "Explanation of why this paper matters for this patient."
    }
  ]
}
```

### `POST /api/scan`

**Request:** `multipart/form-data` with a `file` field.

**Response:**
```json
{
  "id": "uuid",
  "fileName": "prescription.jpg",
  "uploadedAt": "2026-07-18T14:30:00.000Z",
  "extractedText": "Extracted text content...",
  "status": "done"
}
```

### `POST /api/chat`

**Request:**
```json
{
  "message": "What is metformin used for?",
  "context": ["optional extracted document text"]
}
```

**Response:**
```json
{
  "response": "Metformin is a first-line medication for Type 2 Diabetes..."
}
```
