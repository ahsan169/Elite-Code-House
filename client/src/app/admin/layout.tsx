"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const publicAdminRoutes = ["/admin/login"];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = publicAdminRoutes.includes(pathname);

  useEffect(() => {
    if (isPublicRoute) {
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router, isPublicRoute]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-300 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-300 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
