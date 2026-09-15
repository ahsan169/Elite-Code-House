"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBriefcase,
  FaCogs,
  FaQuoteLeft,
  FaBlog,
  FaEnvelope,
  FaCog,
  FaPhone,
  FaComments
} from "react-icons/fa";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: FaHome },
  { label: "Live Calls", href: "/admin/calls", icon: FaPhone },
  { label: "Projects", href: "/admin/portfolio", icon: FaBriefcase },
  { label: "Services", href: "/admin/services", icon: FaCogs },
  { label: "Testimonials", href: "/admin/testimonials", icon: FaQuoteLeft },
  { label: "Blog", href: "/admin/blog", icon: FaBlog },
  { label: "Messages", href: "/admin/messages", icon: FaEnvelope },
  { label: "Live Chats", href: "/admin/chats", icon: FaComments },
  { label: "Settings", href: "/admin/settings", icon: FaCog }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-dark-200 border-r border-white/10 z-40">
      <div className="p-6">
        <Link href="/admin" className="text-xl font-bold text-white">
          Elite<span className="text-primary-500">Code</span>
        </Link>
        <p className="text-xs text-white/40 mt-1">Admin Panel</p>
      </div>

      <nav className="px-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                isActive
                  ? "bg-primary-500/20 text-primary-500"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
