import { useState, useRef, useEffect } from "react";
import type { Patient, ChatMessage as ChatMessageType, ResearchResponse } from "../../types";
import { doctorChatRespond } from "../../api/doctorChat";
import { fetchResearch } from "../../api/fetchResearch";
import ResultsList from "./ResultsList";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorState from "./ErrorState";

type ResearchStatus = "idle" | "loading" | "success" | "error";

interface DoctorChatAssistantProps {
  patient: Patient;
}

export default function DoctorChatAssistant({ patient }: DoctorChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `I have ${patient.label}'s records loaded. Ask me about their conditions, medications, lab results, risk factors, or treatment options.`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [researchStatus, setResearchStatus] = useState<ResearchStatus>("idle");
  const [researchResults, setResearchResults] = useState<ResearchResponse | null>(null);
  const [researchError, setResearchError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `I have ${patient.label}'s records loaded. Ask me about their conditions, medications, lab results, risk factors, or treatment options.`,
        timestamp: new Date().toISOString(),
      },
    ]);
    setResearchStatus("idle");
    setResearchResults(null);
  }, [patient.id, patient.label]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await doctorChatRespond(text, patient.id);
      const assistantMsg: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  async function handleResearch() {
    setResearchStatus("loading");
    setResearchError("");
    try {
      const data = await fetchResearch(patient);
      setResearchResults(data);
      setResearchStatus("success");
    } catch (err) {
      setResearchError(
        err instanceof Error ? err.message : "Failed to fetch research results."
      );
      setResearchStatus("error");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 className="text-sm font-semibold text-slate-700">Clinical Assistant</h3>
          </div>
          <button
            onClick={handleResearch}
            disabled={researchStatus === "loading"}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              researchStatus === "loading"
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
            }`}
          >
            {researchStatus === "loading" ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Searching...
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Find Relevant Research
              </>
            )}
          </button>
        </div>

        <div className="h-72 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? "bg-teal-600 text-white rounded-br-md"
                      : "bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${isUser ? "text-teal-200" : "text-slate-400"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this patient's data..."
            className="flex-1 px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
              !input.trim() || isTyping
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      {researchStatus === "loading" && <LoadingSkeleton />}
      {researchStatus === "success" && researchResults && <ResultsList data={researchResults} />}
      {researchStatus === "error" && <ErrorState message={researchError} onRetry={handleResearch} />}
    </div>
  );
}
