"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import Sidebar from "@/components/layout/Sidebar";
import { Loader2, Bell, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, role, userId } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setIsReady(true);
    }
  }, [isAuthenticated, router]);

  if (!isReady || !role) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  // Determine current context role
  const currentRole = pathname.startsWith("/admin") ? "admin" : role as "talent" | "company";

  return (
    <div className="min-h-screen bg-[#020202] text-white flex">
      <Sidebar role={currentRole} />
      
      <div className="flex-1 ml-64 flex flex-col">
        {/* Dashboard Header toolbar */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-black/50 backdrop-blur-xl z-30">
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span className="uppercase tracking-[0.2em] font-bold">Workspace</span>
            <span className="text-white/10">|</span>
            <span className="text-white/60 capitalize">{pathname.split("/").pop()}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Quick search..."
                className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-[#D4AF37]/50 transition-colors w-40 md:w-64"
              />
            </div>
            <button className="p-2 text-white/40 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full border-2 border-black" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium">{role} User</div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest">{userId?.slice(0, 8)}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <User className="w-5 h-5 text-white/40" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
