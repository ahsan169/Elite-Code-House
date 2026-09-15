"use client";

import { useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center py-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center mb-3 border border-cyan-500/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-cyan-400">
              <path
                d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.38 1.24 4.81L2 22l5.19-1.24C8.62 21.55 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">
            How can we help?
          </h3>
          <p className="text-white/50 text-xs leading-relaxed max-w-[240px]">
            Ask about our services, pricing, or schedule a free consultation.
          </p>
        </div>
      )}

      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {msg.role === "assistant" && (
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-1 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-cyan-400">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.38 1.24 4.81L2 22l5.19-1.24C8.62 21.55 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
          <div
            className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
              msg.role === "user"
                ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-br-md shadow-lg shadow-cyan-500/10"
                : "bg-white/[0.06] text-white/90 rounded-bl-md border border-white/[0.06]"
            }`}
          >
            <p className="text-[13px] whitespace-pre-wrap leading-relaxed">
              {msg.content}
            </p>
            <p
              className={`text-[10px] mt-1.5 ${
                msg.role === "user" ? "text-white/50" : "text-white/30"
              }`}
            >
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-1 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-cyan-400">
              <path
                d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.38 1.24 4.81L2 22l5.19-1.24C8.62 21.55 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="bg-white/[0.06] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex space-x-1">
              <div
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
