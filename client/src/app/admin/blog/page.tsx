"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface BlogPost {
  _id: string;
  title: string;
  published: boolean;
  publishedAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/admin/blog");
      setPosts(response.data.blogs);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/admin/blog/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <FaPlus size={14} />
          New Post
        </Link>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60 font-medium">Title</th>
              <th className="text-left p-4 text-white/60 font-medium">Status</th>
              <th className="text-left p-4 text-white/60 font-medium">Published</th>
              <th className="text-right p-4 text-white/60 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 text-white">{post.title}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${post.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4 text-white/60 text-sm">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "-"}
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/blog/${post._id}`} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white">
                      <FaEdit size={14} />
                    </Link>
                    <button onClick={() => handleDelete(post._id)} className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-red-400">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="p-12 text-center text-white/60">No blog posts yet</div>
        )}
      </div>
    </div>
  );
}
