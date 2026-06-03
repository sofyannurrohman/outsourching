"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Building2, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2,
  ShieldCheck
} from "lucide-react";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types";

interface AdminStats {
  total_talents: number;
  active_talents: number;
  total_companies: number;
  verified_companies: number;
  active_jobs: number;
  active_contracts: number;
  monthly_revenue: number;
  total_revenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<ApiResponse<AdminStats>>("/admin/stats");
      setStats(res.data.data);
    } catch (err) {
      console.error("Failed to load admin stats");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  const statCards = [
    { 
      label: "Total Revenue", 
      val: `$${stats?.total_revenue.toLocaleString()}`, 
      icon: DollarSign, 
      trend: "+12.5%", 
      isUp: true,
      color: "text-green-500"
    },
    { 
      label: "Active Placements", 
      val: stats?.active_contracts, 
      icon: FileText, 
      trend: "+4.2%", 
      isUp: true,
      color: "text-[#D4AF37]"
    },
    { 
      label: "Verified Partners", 
      val: `${stats?.verified_companies}/${stats?.total_companies}`, 
      icon: Building2, 
      trend: "+8.1%", 
      isUp: true,
      color: "text-blue-500"
    },
    { 
      label: "Talent Pool", 
      val: stats?.active_talents, 
      icon: Users, 
      trend: "-1.2%", 
      isUp: false,
      color: "text-purple-500"
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-outfit font-bold mb-2">Platform Overview</h1>
          <p className="text-white/40 text-sm">Real-time performance and system-wide monitoring.</p>
        </div>
        <div className="flex gap-4">
           <button onClick={fetchStats} className="px-6 py-2.5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 transition-all">
             Refresh Data
           </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
                {stat.isUp ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <div className="text-xs uppercase tracking-widest text-white/30 font-bold mb-1">{stat.label}</div>
            <div className="text-2xl font-bold">{stat.val}</div>
            
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/5 transition-all" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-8 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8">
              <ShieldCheck className="w-20 h-20 text-[#D4AF37]/10" />
           </div>
           <div className="text-center space-y-4 relative z-10">
              <TrendingUp className="w-12 h-12 text-[#D4AF37] mx-auto opacity-40 shadow-gold" />
              <h3 className="text-xl font-bold">Revenue Growth Engine</h3>
              <p className="text-sm text-white/30 max-w-sm">Performance visualizations are being aggregated. Monthly revenue is currently trending upward across all sectors.</p>
           </div>
        </div>

        {/* Quick Actions / System Health */}
        <div className="space-y-6">
           <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold">Pending Approvals</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">New Talents</span>
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-[#D4AF37]">12 Pending</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Company Verification</span>
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-[#D4AF37]">3 Pending</span>
                 </div>
              </div>
              <div className="flex gap-2">
                 <Link href="/dashboard/admin/talents" className="flex-1 py-3 bg-[#D4AF37] text-black text-xs font-bold rounded-xl text-center hover:bg-[#D4AF37]/90 transition-all">
                    Verify Talents
                 </Link>
                 <Link href="/dashboard/admin/companies" className="flex-1 py-3 border border-white/10 rounded-xl text-xs font-bold text-center hover:bg-white/5 transition-all">
                    Companies
                 </Link>
              </div>
           </div>

           <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30">System Integrity</h3>
              <div className="space-y-4">
                 {[
                   { name: "Global CDN", status: "Operational" },
                   { name: "Payment Gateway", status: "Operational" },
                   { name: "Matching Engine", status: "Active" },
                 ].map((sys, i) => (
                   <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-white/50">{sys.name}</span>
                      <div className="flex items-center gap-2 text-green-500">
                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                         {sys.status}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
