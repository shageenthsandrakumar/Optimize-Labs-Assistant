import os

from openai import AsyncOpenAI

SYSTEM_PROMPT = (
    "You are a helpful patient health assistant. Answer clearly and informatively about "
    "medications, conditions, and lab results, but always note that the patient should "
    "consult their doctor before making medical decisions. If document context is provided "
    "below, use it to answer questions about the patient's specific records."
)


def _client() -> AsyncOpenAI:
    return AsyncOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        timeout=25.0,
    )


async def chat_reply(message: str, context: list[str]) -> str:
    model = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if context:
        joined = "\n\n---\n\n".join(context)
        messages.append(
            {"role": "system", "content": f"Patient's document context:\n{joined}"}
        )
    messages.append({"role": "user", "content": message})

    try:
        response = await _client().chat.completions.create(model=model, messages=messages)
        return (response.choices[0].message.content or "").strip()
    except Exception:
        return (
            "Sorry, I'm having trouble reaching the assistant right now. "
            "Please try again in a moment."
        )


DOCTOR_SYSTEM_PROMPT = (
    "You are a clinical assistant helping a doctor review a specific patient's record. "
    "Use clinical language, not patient-friendly phrasing. Answer questions about the "
    "patient's conditions, medications, risk factors, and treatment options based on the "
    "record provided below. Be concise and direct — the reader is a physician."
)


async def doctor_chat_reply(
    message: str, conditions: list[str], medications: list[str], context: list[str]
) -> str:
    model = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")
    record = (
        f"Conditions: {', '.join(conditions) or 'none listed'}\n"
        f"Medications: {', '.join(medications) or 'none listed'}"
    )
    messages = [
        {"role": "system", "content": DOCTOR_SYSTEM_PROMPT},
        {"role": "system", "content": f"Patient record:\n{record}"},
    ]
    if context:
        joined = "\n\n---\n\n".join(context)
        messages.append(
            {"role": "system", "content": f"Additional document context:\n{joined}"}
        )
    messages.append({"role": "user", "content": message})

    try:
        response = await _client().chat.completions.create(model=model, messages=messages)
        return (response.choices[0].message.content or "").strip()
    except Exception:
        return (
            "Sorry, I'm having trouble reaching the assistant right now. "
            "Please try again in a moment."
        )
