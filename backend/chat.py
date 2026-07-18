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

    response = await _client().chat.completions.create(model=model, messages=messages)
    return (response.choices[0].message.content or "").strip()
