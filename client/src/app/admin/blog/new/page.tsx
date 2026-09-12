"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function NewBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: "",
    published: false,
    seoTitle: "",
    seoDescription: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/admin/blog", {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim())
      });
      router.push("/admin/blog");
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">New Blog Post</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all"
            placeholder="Blog post title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Excerpt</label>
          <textarea
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all resize-none"
            placeholder="Brief summary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Content *</label>
          <textarea
            required
            rows={15}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all resize-none font-mono text-sm"
            placeholder="Write your blog post content here (HTML supported)..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all"
            placeholder="react, node.js, tutorial"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-5 h-5 rounded bg-white/5 border-white/10 text-primary-500 focus:ring-primary-500"
          />
          <label htmlFor="published" className="text-white/70">Publish immediately</label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Post"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
