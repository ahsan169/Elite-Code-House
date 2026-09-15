"use client";

import { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 80) + "px";
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-3 pb-3 pt-1 border-t border-white/[0.06] shrink-0"
    >
      <div className="flex items-end gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-cyan-500/40 transition-colors">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent text-white text-[13px] placeholder-white/30 resize-none focus:outline-none max-h-[80px]"
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`p-2 rounded-lg transition-all duration-200 shrink-0 ${
            message.trim() && !disabled
              ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              : "bg-white/[0.06] text-white/20 cursor-not-allowed"
          }`}
        >
          <FaPaperPlane size={13} />
        </button>
      </div>
      <p className="text-[10px] text-white/20 text-center mt-1.5">
        Powered by AI · Elite Code House
      </p>
    </form>
  );
}
