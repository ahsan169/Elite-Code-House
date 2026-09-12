"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Service {
  _id: string;
  title: string;
  accentColor: string;
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    accentColor: "#7ddafc",
    order: 0
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("/admin/services");
      setServices(response.data.services);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/services/${editingId}`, formData);
      } else {
        await api.post("/admin/services", formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: "", description: "", shortDescription: "", accentColor: "#7ddafc", order: 0 });
      fetchServices();
    } catch (error) {
      console.error("Failed to save service:", error);
    }
  };

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: "",
      shortDescription: "",
      accentColor: service.accentColor,
      order: service.order
    });
    setEditingId(service._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/admin/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Services</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: "", description: "", shortDescription: "", accentColor: "#7ddafc", order: 0 }); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <FaPlus size={14} />
          Add Service
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 mb-8 max-w-2xl space-y-4">
          <h3 className="text-lg font-bold text-white">{editingId ? "Edit" : "New"} Service</h3>
          <input
            type="text"
            placeholder="Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all"
          />
          <textarea
            placeholder="Description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-all resize-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Accent Color</label>
              <input
                type="color"
                value={formData.accentColor}
                onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-all"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              {editingId ? "Update" : "Create"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60 font-medium">Title</th>
              <th className="text-left p-4 text-white/60 font-medium">Color</th>
              <th className="text-left p-4 text-white/60 font-medium">Order</th>
              <th className="text-right p-4 text-white/60 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 text-white">{service.title}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: service.accentColor }} />
                    <span className="text-white/60 text-sm">{service.accentColor}</span>
                  </div>
                </td>
                <td className="p-4 text-white/60">{service.order}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(service)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white">
                      <FaEdit size={14} />
                    </button>
                    <button onClick={() => handleDelete(service._id)} className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-red-400">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
