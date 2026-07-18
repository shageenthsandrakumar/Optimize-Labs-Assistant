import json
import os

from openai import AsyncOpenAI

def _client() -> AsyncOpenAI:
    return AsyncOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        timeout=25.0,
    )


def _fallback_ranking(papers: list[dict]) -> list[dict]:
    # If the LLM call or its JSON output fails, degrade to unranked-but-present results
    # rather than a 500 — a live demo should show something, not an error screen.
    return [
        {**p, "relevance_score": 0.5, "relevance_reasoning": "Matches the patient's search terms."}
        for p in papers
    ]


SYSTEM_PROMPT = """You are a clinical research assistant helping a doctor keep up with
literature relevant to a specific patient. You will be given the patient's conditions and
medications, and a list of candidate PubMed papers (title + abstract).

For each paper, decide whether it is genuinely relevant to THIS patient's specific clinical
picture (not just topically adjacent), and if so, explain why in one sentence a busy doctor
could read in five seconds — reference the patient's actual condition/medication combination,
not a generic summary of the paper.

Score relevance from 0.0 (irrelevant) to 1.0 (highly relevant, actionable for this patient).
Set relevant=false and a low score for papers that only loosely share a keyword.

Return JSON: {"ranked": [{"pmid": str, "relevant": bool, "relevance_score": float,
"relevance_reasoning": str}, ...]} covering every paper given, in the same order."""


def _build_user_prompt(
    conditions: list[str], medications: list[str], notes: str, papers: list[dict]
) -> str:
    patient_block = (
        f"Conditions: {', '.join(conditions) or 'none listed'}\n"
        f"Medications: {', '.join(medications) or 'none listed'}\n"
        f"Notes: {notes or 'none'}"
    )
    papers_block = "\n\n".join(
        f"PMID {p['pmid']}\nTitle: {p['title']}\nAbstract: {p['abstract'][:1200]}"
        for p in papers
    )
    return f"PATIENT\n{patient_block}\n\nCANDIDATE PAPERS\n{papers_block}"


async def rank_papers(
    conditions: list[str], medications: list[str], notes: str, papers: list[dict]
) -> list[dict]:
    if not papers:
        return []

    model = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
    try:
        response = await _client().chat.completions.create(
            model=model,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": _build_user_prompt(conditions, medications, notes, papers),
                },
            ],
        )
        parsed = json.loads(response.choices[0].message.content)
    except Exception:
        return _fallback_ranking(papers)

    by_pmid = {p["pmid"]: p for p in papers}
    ranked = []
    for entry in parsed.get("ranked", []):
        paper = by_pmid.get(entry.get("pmid"))
        if not paper or not entry.get("relevant"):
            continue
        ranked.append(
            {
                **paper,
                "relevance_score": float(entry.get("relevance_score", 0.0)),
                "relevance_reasoning": entry.get("relevance_reasoning", ""),
            }
        )
    ranked.sort(key=lambda r: r["relevance_score"], reverse=True)
    return ranked or _fallback_ranking(papers[:4])
