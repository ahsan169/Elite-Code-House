"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Project {
  _id: string;
  title: string;
  category: string;
  featured: boolean;
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/admin/projects");
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/admin/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <FaPlus size={14} />
          Add Project
        </Link>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60 font-medium">Title</th>
              <th className="text-left p-4 text-white/60 font-medium">Category</th>
              <th className="text-left p-4 text-white/60 font-medium">Featured</th>
              <th className="text-right p-4 text-white/60 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 text-white">{project.title}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                    {project.category}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.featured
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {project.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/portfolio/${project._id}`}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
                    >
                      <FaEdit size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-red-400"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="p-12 text-center text-white/60">
            No projects found. Create your first project!
          </div>
        )}
      </div>
    </div>
  );
}
