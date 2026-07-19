import { CHAT_RESPONSES, CHAT_FALLBACK } from "./staticData";

// Static replay of real captured chat responses — see staticData.ts.
export async function chatbotRespond(
  message: string,
  _context?: string[]
): Promise<string> {
  await new Promise((r) => setTimeout(r, 900));

  const lower = message.toLowerCase();
  for (const entry of CHAT_RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return CHAT_FALLBACK;
}
