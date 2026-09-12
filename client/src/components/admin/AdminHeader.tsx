"use client";

import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <header className="h-16 bg-dark-200 border-b border-white/10 flex items-center justify-between px-8">
      <div>
        <h2 className="text-white font-semibold">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-white/60">
          <FaUser size={14} />
          <span className="text-sm">Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <FaSignOutAlt size={14} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
}
