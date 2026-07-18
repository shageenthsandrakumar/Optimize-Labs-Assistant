import {
  MOCK_CHAT_RESPONSES,
  FALLBACK_RESPONSE,
} from "../data/mockChatResponses";

export async function chatbotRespond(
  message: string,
  _context?: string[]
): Promise<string> {
  // MOCK — replace with a real fetch() when RAG backend is ready:
  // const res = await fetch("http://localhost:8000/api/chat", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ message, context }),
  // });
  // const data = await res.json();
  // return data.response;

  await new Promise((r) => setTimeout(r, 1000));

  const lower = message.toLowerCase();
  for (const entry of MOCK_CHAT_RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return FALLBACK_RESPONSE;
}
