"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  rating: number;
  featured: boolean;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    quote: "",
    authorName: "",
    authorRole: "",
    authorCompany: "",
    rating: 5,
    featured: false
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get("/admin/testimonials");
      setTestimonials(response.data.testimonials);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/testimonials/${editingId}`, formData);
      } else {
        await api.post("/admin/testimonials", formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ quote: "", authorName: "", authorRole: "", authorCompany: "", rating: 5, featured: false });
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to save testimonial:", error);
    }
  };

  const handleEdit = (t: Testimonial) => {
    setFormData({ quote: t.quote, authorName: t.authorName, authorRole: t.authorRole, authorCompany: t.authorCompany, rating: t.rating, featured: t.featured });
    setEditingId(t._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/admin/testimonials/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Testimonials</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ quote: "", authorName: "", authorRole: "", authorCompany: "", rating: 5, featured: false }); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <FaPlus size={14} />
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mb-8 max-w-2xl space-y-4">
          <h3 className="text-lg font-bold text-white">{editingId ? "Edit" : "New"} Testimonial</h3>
          <textarea
            placeholder="Quote"
            required
            rows={3}
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all resize-none"
          />
          <div className="grid grid-cols-3 gap-4">
            <input type="text" placeholder="Author Name" required value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all" />
            <input type="text" placeholder="Role" value={formData.authorRole} onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all" />
            <input type="text" placeholder="Company" value={formData.authorCompany} onChange={(e) => setFormData({ ...formData, authorCompany: e.target.value })} className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-white/60 text-sm">Rating:</label>
              <select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-all">
                {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-dark-200">{n}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-white/60 text-sm">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="rounded" />
              Featured
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">{editingId ? "Update" : "Create"}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t._id} className="glass rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-white italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="font-medium text-white">{t.authorName}</span>
                  {t.authorRole && <span>· {t.authorRole}</span>}
                  {t.authorCompany && <span>· {t.authorCompany}</span>}
                  <span>· ⭐ {t.rating}</span>
                  {t.featured && <span className="px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded text-xs">Featured</span>}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => handleEdit(t)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"><FaEdit size={14} /></button>
                <button onClick={() => handleDelete(t._id)} className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-red-400"><FaTrash size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
