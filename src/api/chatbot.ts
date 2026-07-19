import { API_BASE_URL } from "./config";

export async function chatbotRespond(
  message: string,
  context?: string[]
): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, context: context ?? [] }),
  });
  if (!res.ok) throw new Error(`Chat request failed (${res.status})`);
  const data = await res.json();
  return data.response;
}
