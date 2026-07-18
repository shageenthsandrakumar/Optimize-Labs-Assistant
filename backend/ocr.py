import base64
import io
import os

import pdfplumber
from openai import AsyncOpenAI

OCR_PROMPT = (
    "Extract all text from this medical document image exactly as written. "
    "Return only the extracted text, no commentary or formatting."
)


def _client() -> AsyncOpenAI:
    return AsyncOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
    )


def _extract_pdf_text(data: bytes) -> str:
    with pdfplumber.open(io.BytesIO(data)) as pdf:
        pages = [page.extract_text() or "" for page in pdf.pages]
    return "\n".join(pages).strip()


async def _extract_image_text(content_type: str, data: bytes) -> str:
    model = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
    b64 = base64.b64encode(data).decode()
    response = await _client().chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": OCR_PROMPT},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{content_type};base64,{b64}"},
                    },
                ],
            }
        ],
    )
    return (response.choices[0].message.content or "").strip()


async def extract_text(filename: str, content_type: str, data: bytes) -> str:
    is_pdf = (content_type == "application/pdf") or filename.lower().endswith(".pdf")
    if is_pdf:
        text = _extract_pdf_text(data)
        if text:
            return text
        # Scanned/image-only PDFs have no native text layer; out of scope for today's demo.
        raise ValueError("No extractable text found in PDF (likely a scanned, image-only PDF)")
    return await _extract_image_text(content_type or "image/jpeg", data)
