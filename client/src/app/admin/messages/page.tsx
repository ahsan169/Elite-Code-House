"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { FaTrash, FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get("/admin/messages");
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/admin/messages/${id}/read`);
      setMessages(messages.map((m) => (m._id === id ? { ...m, read: true } : m)));
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/admin/messages/${id}`);
      setMessages(messages.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <span className="text-white/60 text-sm">{messages.filter((m) => !m.read).length} unread</span>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => { setSelectedMessage(msg); if (!msg.read) markAsRead(msg._id); }}
                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedMessage?._id === msg._id ? "bg-white/10" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {msg.read ? (
                      <FaEnvelopeOpen className="text-white/40" size={14} />
                    ) : (
                      <FaEnvelope className="text-primary-500" size={14} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-medium ${msg.read ? "text-white/60" : "text-white"}`}>{msg.name}</span>
                      <span className="text-xs text-white/40">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-white/40 truncate">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="p-12 text-center text-white/60">No messages yet</div>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          {selectedMessage ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedMessage.name}</h3>
                  <p className="text-white/60">{selectedMessage.email}</p>
                </div>
                <button onClick={() => handleDelete(selectedMessage._id)} className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-red-400">
                  <FaTrash size={14} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {selectedMessage.phone && (
                  <div>
                    <span className="text-white/40 text-sm">Phone:</span>
                    <p className="text-white">{selectedMessage.phone}</p>
                  </div>
                )}
                {selectedMessage.company && (
                  <div>
                    <span className="text-white/40 text-sm">Company:</span>
                    <p className="text-white">{selectedMessage.company}</p>
                  </div>
                )}
                {selectedMessage.service && (
                  <div>
                    <span className="text-white/40 text-sm">Service:</span>
                    <p className="text-white">{selectedMessage.service}</p>
                  </div>
                )}
                {selectedMessage.budget && (
                  <div>
                    <span className="text-white/40 text-sm">Budget:</span>
                    <p className="text-white">{selectedMessage.budget}</p>
                  </div>
                )}
              </div>

              <div>
                <span className="text-white/40 text-sm">Message:</span>
                <p className="text-white mt-1 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Your inquiry at Elite Code House`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white/40">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
