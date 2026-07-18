import os
import xml.etree.ElementTree as ET

import httpx

EUTILS_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"
RECENCY_WINDOW_DAYS = 1095  # last ~3 years, keeps results "latest research"


def _api_key_params() -> dict[str, str]:
    key = os.getenv("NCBI_API_KEY")
    return {"api_key": key} if key else {}


def build_pubmed_term(conditions: list[str], medications: list[str]) -> str:
    terms = [f'"{t}"[Title/Abstract]' for t in [*conditions, *medications]]
    return " OR ".join(terms)


async def esearch(term: str, retmax: int = 10) -> list[str]:
    params = {
        "db": "pubmed",
        "term": term,
        "retmode": "json",
        "retmax": str(retmax),
        "sort": "relevance",
        "datetype": "pdat",
        "reldate": str(RECENCY_WINDOW_DAYS),
        **_api_key_params(),
    }
    async with httpx.AsyncClient(timeout=15) as client:
        resp = await client.get(f"{EUTILS_BASE}/esearch.fcgi", params=params)
        resp.raise_for_status()
        return resp.json()["esearchresult"].get("idlist", [])


def _text(el: ET.Element | None) -> str:
    return "".join(el.itertext()).strip() if el is not None else ""


def _parse_pub_date(article: ET.Element) -> str:
    pub_date = article.find(".//Journal/JournalIssue/PubDate")
    if pub_date is None:
        return ""
    year = _text(pub_date.find("Year"))
    month = _text(pub_date.find("Month"))
    day = _text(pub_date.find("Day"))
    if year and month and day:
        return f"{year}-{month}-{day}"
    if year and month:
        return f"{year}-{month}"
    if year:
        return year
    return _text(pub_date.find("MedlineDate"))


def _parse_abstract(article: ET.Element) -> str:
    parts = [_text(el) for el in article.findall(".//Abstract/AbstractText")]
    return " ".join(p for p in parts if p)


async def efetch_details(pmids: list[str]) -> list[dict]:
    if not pmids:
        return []
    params = {
        "db": "pubmed",
        "id": ",".join(pmids),
        "rettype": "abstract",
        "retmode": "xml",
        **_api_key_params(),
    }
    async with httpx.AsyncClient(timeout=20) as client:
        resp = await client.get(f"{EUTILS_BASE}/efetch.fcgi", params=params)
        resp.raise_for_status()
        root = ET.fromstring(resp.text)

    results = []
    for citation in root.findall(".//PubmedArticle"):
        pmid = _text(citation.find(".//PMID"))
        article = citation.find(".//Article")
        if article is None or not pmid:
            continue
        results.append(
            {
                "pmid": pmid,
                "title": _text(article.find("ArticleTitle")),
                "abstract": _parse_abstract(article),
                "published_date": _parse_pub_date(article),
                "url": f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
            }
        )
    return results


async def search_pubmed(
    conditions: list[str], medications: list[str], retmax: int = 10
) -> list[dict]:
    term = build_pubmed_term(conditions, medications)
    pmids = await esearch(term, retmax=retmax)
    return await efetch_details(pmids)
