"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "web",
    technologies: "",
    clientName: "",
    projectUrl: "",
    featured: false,
    seoTitle: "",
    seoDescription: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/admin/projects", {
        ...formData,
        technologies: formData.technologies.split(",").map((t) => t.trim())
      });
      router.push("/admin/portfolio");
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">New Project</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all"
            placeholder="Project title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Short Description</label>
          <input
            type="text"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all"
            placeholder="Brief description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
          <textarea
            rows={5}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all resize-none"
            placeholder="Full description"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-all"
            >
              <option value="web" className="bg-dark-200">Web</option>
              <option value="mobile" className="bg-dark-200">Mobile</option>
              <option value="saas" className="bg-dark-200">SaaS</option>
              <option value="ai" className="bg-dark-200">AI</option>
              <option value="ecommerce" className="bg-dark-200">E-commerce</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Client Name</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all"
              placeholder="Client name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all"
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Project URL</label>
          <input
            type="url"
            value={formData.projectUrl}
            onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all"
            placeholder="https://example.com"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-5 h-5 rounded bg-white/5 border-white/10 text-primary-500 focus:ring-primary-500"
          />
          <label htmlFor="featured" className="text-white/70">
            Featured Project
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/portfolio")}
            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
