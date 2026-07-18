from dotenv import load_dotenv

load_dotenv()

import uuid
from datetime import datetime, timezone

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from chat import chat_reply, doctor_chat_reply
from ocr import extract_text
from pubmed import search_pubmed
from ranking import rank_papers

app = FastAPI(title="Optimize Labs Assistant — Research API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


class ResearchRequest(BaseModel):
    conditions: list[str]
    medications: list[str]
    notes: str = ""


class ResearchMatch(BaseModel):
    source: str
    external_id: str
    title: str
    url: str
    published_date: str
    relevance_score: float
    relevance_reasoning: str


class ResearchResponse(BaseModel):
    query_terms: list[str]
    matches: list[ResearchMatch]


@app.post("/api/research", response_model=ResearchResponse)
async def research(req: ResearchRequest) -> ResearchResponse:
    try:
        papers = await search_pubmed(req.conditions, req.medications, retmax=10)
    except Exception:
        papers = []
    ranked = await rank_papers(req.conditions, req.medications, req.notes, papers)

    matches = [
        ResearchMatch(
            source="pubmed",
            external_id=f"PMID{p['pmid']}",
            title=p["title"],
            url=p["url"],
            published_date=p["published_date"],
            relevance_score=round(p["relevance_score"], 2),
            relevance_reasoning=p["relevance_reasoning"],
        )
        for p in ranked[:6]
    ]

    return ResearchResponse(
        query_terms=req.conditions + req.medications,
        matches=matches,
    )


class ScanResponse(BaseModel):
    id: str
    fileName: str
    uploadedAt: str
    extractedText: str
    status: str


@app.post("/api/scan", response_model=ScanResponse)
async def scan(file: UploadFile = File(...)) -> ScanResponse:
    data = await file.read()
    try:
        text = await extract_text(file.filename or "upload", file.content_type or "", data)
        status = "done"
    except Exception:
        text = ""
        status = "error"

    return ScanResponse(
        id=str(uuid.uuid4()),
        fileName=file.filename or "upload",
        uploadedAt=datetime.now(timezone.utc).isoformat(),
        extractedText=text,
        status=status,
    )


class ChatRequest(BaseModel):
    message: str
    context: list[str] = []


class ChatResponse(BaseModel):
    response: str


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    reply = await chat_reply(req.message, req.context)
    return ChatResponse(response=reply)


class DoctorChatRequest(BaseModel):
    message: str
    patient_id: str
    conditions: list[str] = []
    medications: list[str] = []
    context: list[str] = []


@app.post("/api/doctor-chat", response_model=ChatResponse)
async def doctor_chat(req: DoctorChatRequest) -> ChatResponse:
    reply = await doctor_chat_reply(req.message, req.conditions, req.medications, req.context)
    return ChatResponse(response=reply)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
