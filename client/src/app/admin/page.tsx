"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { FaBriefcase, FaCogs, FaQuoteLeft, FaEnvelope, FaBlog } from "react-icons/fa";

interface Stats {
  projects: number;
  services: number;
  testimonials: number;
  messages: number;
  unreadMessages: number;
  blogPosts: number;
}

const statCards = [
  { label: "Projects", key: "projects" as const, icon: FaBriefcase, color: "#7ddafc" },
  { label: "Services", key: "services" as const, icon: FaCogs, color: "#b7fe02" },
  { label: "Testimonials", key: "testimonials" as const, icon: FaQuoteLeft, color: "#edff75" },
  { label: "Blog Posts", key: "blogPosts" as const, icon: FaBlog, color: "#fe86a6" },
  { label: "Total Messages", key: "messages" as const, icon: FaEnvelope, color: "#977bf2" },
  { label: "Unread Messages", key: "unreadMessages" as const, icon: FaEnvelope, color: "#ff6b6b" }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    services: 0,
    testimonials: 0,
    messages: 0,
    unreadMessages: 0,
    blogPosts: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, services, testimonials, messages, blog] = await Promise.all([
          api.get("/admin/projects"),
          api.get("/admin/services"),
          api.get("/admin/testimonials"),
          api.get("/admin/messages"),
          api.get("/admin/blog")
        ]);

        setStats({
          projects: projects.data.count || 0,
          services: services.data.count || 0,
          testimonials: testimonials.data.count || 0,
          messages: messages.data.count || 0,
          unreadMessages: messages.data.messages?.filter((m: { read: boolean }) => !m.read).length || 0,
          blogPosts: blog.data.count || 0
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="p-6 glass rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${card.color}20` }}
              >
                <span style={{ color: card.color }}>
                  <card.icon size={24} />
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats[card.key]}</div>
            <div className="text-sm text-white/60">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 glass rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <a
            href="/admin/calls"
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-center"
          >
            <div className="text-2xl mb-2">&#128222;</div>
            <div className="text-sm text-white/80">Live Calls</div>
          </a>
          <a
            href="/admin/portfolio/new"
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-center"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="text-sm text-white/80">New Project</div>
          </a>
          <a
            href="/admin/services"
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-center"
          >
            <div className="text-2xl mb-2">🔧</div>
            <div className="text-sm text-white/80">Manage Services</div>
          </a>
          <a
            href="/admin/blog/new"
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-center"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="text-sm text-white/80">New Blog Post</div>
          </a>
          <a
            href="/admin/messages"
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-center"
          >
            <div className="text-2xl mb-2">💬</div>
            <div className="text-sm text-white/80">View Messages</div>
          </a>
        </div>
      </div>
    </div>
  );
}
