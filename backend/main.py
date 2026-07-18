from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
    # TODO: replace with real PubMed E-utilities search + LLM ranking
    return ResearchResponse(
        query_terms=req.conditions + req.medications,
        matches=[],
    )


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
