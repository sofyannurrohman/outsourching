"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  UserCircle, 
  FileText, 
  Search, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role: "talent" | "company" | "admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const menuItems = {
    talent: [
      { name: "Overview", href: "/dashboard/talent", icon: LayoutDashboard },
      { name: "My Applications", href: "/dashboard/talent/applications", icon: FileText },
      { name: "Find Jobs", href: "/jobs", icon: Search },
      { name: "My Profile", href: "/dashboard/talent/profile", icon: UserCircle },
    ],
    company: [
      { name: "Overview", href: "/dashboard/company", icon: LayoutDashboard },
      { name: "Manage Jobs", href: "/dashboard/company/jobs", icon: Briefcase },
      { name: "Talent Pool", href: "/dashboard/company/talent-search", icon: Search },
      { name: "Company Profile", href: "/dashboard/company/profile", icon: UserCircle },
    ],
    admin: [
      { name: "Admin Home", href: "/admin", icon: ShieldCheck },
      { name: "Verify Talent", href: "/admin/talents", icon: UserCircle },
      { name: "Verify Companies", href: "/admin/companies", icon: Briefcase },
      { name: "Matching Engine", href: "/admin/matching", icon: Settings },
    ],
  };

  const items = menuItems[role] || [];

  return (
    <aside className="w-64 bg-[#050505] border-r border-white/5 flex flex-col fixed h-screen z-40">
      <div className="p-8">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={120} height={40} className="object-contain" />
        </Link>
        <div className="mt-2 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">
          {role} Dashboard
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", isActive ? "text-[#D4AF37]" : "text-white/30 group-hover:text-white")} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <Link 
          href="/dashboard/settings" 
          className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </Link>
        <button
          onClick={() => clearAuth()}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500/60 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
