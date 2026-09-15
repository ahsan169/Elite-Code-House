"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { FaComments, FaEnvelope, FaPhone, FaUser, FaCheckCircle } from "react-icons/fa";

interface VisitorInfo {
  name: string;
  email: string;
  phone: string;
  captured: boolean;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Chat {
  _id: string;
  conversationId: string;
  visitorInfo: VisitorInfo;
  status: "active" | "closed";
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ChatDetail extends Chat {
  messages: ChatMessage[];
}

interface ChatStats {
  total: number;
  active: number;
  closed: number;
  todayCount: number;
}

export default function AdminChatsPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatDetail | null>(null);
  const [stats, setStats] = useState<ChatStats>({ total: 0, active: 0, closed: 0, todayCount: 0 });

  useEffect(() => {
    fetchChats();
    fetchStats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await api.get("/admin/chats");
      setChats(response.data.chats);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/chats/stats");
      setStats(response.data.stats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const fetchChatDetails = async (conversationId: string) => {
    try {
      const response = await api.get(`/admin/chats/${conversationId}`);
      setSelectedChat(response.data.chat);
    } catch (error) {
      console.error("Failed to fetch chat details:", error);
    }
  };

  const closeChat = async (conversationId: string) => {
    try {
      await api.put(`/admin/chats/${conversationId}/close`);
      setChats(chats.map(c =>
        c.conversationId === conversationId ? { ...c, status: "closed" } : c
      ));
      if (selectedChat?.conversationId === conversationId) {
        setSelectedChat({ ...selectedChat, status: "closed" });
      }
    } catch (error) {
      console.error("Failed to close chat:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Live Chats</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FaComments className="text-blue-400" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-white/60 text-sm">Total Chats</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <FaComments className="text-green-400" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
              <p className="text-white/60 text-sm">Active</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
              <FaCheckCircle className="text-gray-400" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.closed}</p>
              <p className="text-white/60 text-sm">Closed</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <FaComments className="text-primary-400" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.todayCount}</p>
              <p className="text-white/60 text-sm">Today</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <span className="text-white/60 text-sm">{chats.filter(c => c.status === "active").length} active conversations</span>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.conversationId}
                onClick={() => fetchChatDetails(chat.conversationId)}
                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${
                  selectedChat?.conversationId === chat.conversationId ? "bg-white/10" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {chat.status === "active" ? (
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-gray-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-white">
                        {chat.visitorInfo.name || "Anonymous Visitor"}
                      </span>
                      <span className="text-xs text-white/40">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {chat.visitorInfo.email && (
                      <p className="text-xs text-white/40 truncate">{chat.visitorInfo.email}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        chat.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}>
                        {chat.status}
                      </span>
                      <span className="text-xs text-white/40">
                        {chat.messageCount} messages
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {chats.length === 0 && (
              <div className="p-12 text-center text-white/60">No chat conversations yet</div>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          {selectedChat ? (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedChat.visitorInfo.name || "Anonymous Visitor"}
                  </h3>
                  <p className="text-white/60 text-sm">
                    Conversation started {new Date(selectedChat.createdAt).toLocaleString()}
                  </p>
                </div>
                {selectedChat.status === "active" && (
                  <button
                    onClick={() => closeChat(selectedChat.conversationId)}
                    className="px-3 py-1.5 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-red-400 text-sm"
                  >
                    Close Chat
                  </button>
                )}
              </div>

              {(selectedChat.visitorInfo.email || selectedChat.visitorInfo.phone) && (
                <div className="flex gap-4 mb-6 pb-4 border-b border-white/10">
                  {selectedChat.visitorInfo.email && (
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <FaEnvelope size={12} />
                      <span>{selectedChat.visitorInfo.email}</span>
                    </div>
                  )}
                  {selectedChat.visitorInfo.phone && (
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <FaPhone size={12} />
                      <span>{selectedChat.visitorInfo.phone}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex-1 overflow-y-auto space-y-3 max-h-[400px]">
                {selectedChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-white/10 text-white/90 rounded-bl-md"
                        : "bg-primary-500/20 text-white/90 rounded-br-md"
                    }`}>
                      <p className="text-xs font-medium mb-1 text-white/40">
                        {msg.role === "user" ? "Visitor" : "AI Agent"}
                      </p>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white/40">
              Select a conversation to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
