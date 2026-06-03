"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Loader2,
  Briefcase,
  MapPin,
  DollarSign,
  Search,
  ChevronRight,
  ShieldCheck,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Application, PaginatedResponse } from "@/types";

export default function TalentApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<PaginatedResponse<Application>>("/talent/applications");
      setApps(res.data.data);
    } catch (err) {
      console.error("Failed to fetch applications");
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "reviewed": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "shortlisted": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "hired": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "rejected": return "bg-red-500/10 text-red-500/60 border-red-500/20";
      default: return "bg-white/5 text-white/40 border-white/10";
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-outfit font-bold mb-2">Mission Tracking</h1>
          <p className="text-white/40 text-sm">Monitor the status of your elite placements and corporate reviews.</p>
        </div>
        <div className="flex gap-4">
           <Link href="/jobs" className="btn-gold text-xs px-6 py-2.5 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Find More Missions
           </Link>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: "Active Applications", count: apps.length, icon: FileText, color: "text-[#D4AF37]" },
           { label: "In Review", count: apps.filter(a => a.status === 'reviewed').length, icon: Clock, color: "text-blue-400" },
           { label: "Shortlisted", count: apps.filter(a => a.status === 'shortlisted').length, icon: ShieldCheck, color: "text-purple-400" },
           { label: "Placements", count: apps.filter(a => a.status === 'hired').length, icon: CheckCircle2, color: "text-green-400" },
         ].map((stat, i) => (
           <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                 <stat.icon className={`w-4 h-4 ${stat.color}`} />
                 <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold">{stat.count}</div>
           </div>
         ))}
      </div>

      {/* Main List */}
      <div className="space-y-4">
        {apps.length > 0 ? (
          apps.map((app) => (
            <div 
              key={app.id} 
              className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between group hover:border-[#D4AF37]/30 transition-all gap-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                   <Briefcase className="w-8 h-8 text-white/20" />
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold group-hover:text-[#D4AF37] transition-colors">Strategic Mission Name</h3>
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${getStatusStyle(app.status)}`}>
                         {app.status}
                      </span>
                   </div>
                   <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" /> $3,000 - $5,000</span>
                      <span className="w-1 h-1 bg-white/10 rounded-full" />
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-white/20" /> Jakarta, ID</span>
                      <span className="w-1 h-1 bg-white/10 rounded-full" />
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-white/20" /> Applied on {new Date(app.createdAt).toLocaleDateString()}</span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                 <Link href={`/jobs/${app.jobId}`} className="text-xs font-bold text-[#D4AF37] flex items-center gap-2 group/link uppercase tracking-widest">
                    View Vacancy
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                 </Link>
                 {app.adminNote && (
                   <div className="text-[10px] text-white/30 max-w-[200px] text-right italic font-medium">
                      Note: "{app.adminNote}"
                   </div>
                 )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 border border-dashed border-white/10 rounded-3xl text-center space-y-4 bg-white/[0.01]">
             <FileText className="w-12 h-12 text-white/10 mx-auto" />
             <p className="text-white/20 text-sm">No active applications currently in progress.</p>
             <Link href="/jobs" className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest hover:underline">Start Prospecting</Link>
          </div>
        )}
      </div>
    </div>
  );
}
