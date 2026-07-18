from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
    papers = await search_pubmed(req.conditions, req.medications, retmax=10)
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


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
