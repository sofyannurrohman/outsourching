"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Star, 
  AlertCircle,
  FileText,
  Loader2
} from "lucide-react";
import { api } from "@/lib/api";
import { Talent, Application, ApiResponse, PaginatedResponse } from "@/types";
import { useAuthStore } from "@/store/auth";

export default function TalentDashboardPage() {
  const { userId } = useAuthStore();
  const [profile, setProfile] = useState<Talent | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [profileRes, appsRes] = await Promise.all([
        api.get<ApiResponse<Talent>>("/talent/profile"),
        api.get<PaginatedResponse<Application>>("/talent/applications", { params: { limit: 5 } }),
      ]);
      setProfile(profileRes.data.data);
      setApplications(appsRes.data.data);
    } catch (err) {
      console.error("Failed to load dashboard data");
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

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/[0.03] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/10 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <h1 className="text-3xl font-outfit font-bold mb-2">
            Welcome, <span className="gold-gradient bg-clip-text text-transparent">{profile?.fullName}</span>
          </h1>
          <p className="text-white/40 text-sm">Your elite career path is currently being managed.</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <Link href="/jobs" className="btn-gold text-xs px-6 py-2.5 flex items-center gap-2">
            Browse Jobs
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/dashboard/talent/profile" className="px-6 py-2.5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 transition-all">
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Apps", val: applications.length, icon: FileText, color: "text-blue-400" },
          { label: "Shortlisted", val: 0, icon: Star, color: "text-[#D4AF37]" },
          { label: "Pool Status", val: profile?.poolStatus, icon: CheckCircle2, color: "text-green-400" },
          { label: "Exp. Level", val: `${profile?.experienceYears} Years`, icon: Briefcase, color: "text-purple-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <div className={`p-2 w-fit rounded-lg bg-white/5 mb-4 ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div className="text-xs uppercase tracking-widest text-white/30 font-bold mb-1">{stat.label}</div>
            <div className="text-xl font-bold capitalize">{stat.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <span className="w-1.5 h-6 gold-gradient rounded-full" />
              Recent Applications
            </h2>
            <Link href="/dashboard/talent/applications" className="text-xs text-[#D4AF37] hover:underline uppercase tracking-widest font-bold">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.map((app) => (
                <div key={app.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-[#D4AF37]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white/20" />
                    </div>
                    <div>
                      <h4 className="font-bold group-hover:text-[#D4AF37] transition-colors">{app.job?.title || "Role Unavailable"}</h4>
                      <div className="flex items-center gap-3 text-xs text-white/40 mt-1">
                        <span>{app.job?.companyName || "AWS SmartTalent Client"}</span>
                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Applied {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    app.status === 'pending' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                    app.status === 'accepted' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    'bg-white/5 text-white/40 border-white/10'
                  }`}>
                    {app.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 border border-dashed border-white/10 rounded-3xl text-center">
                <p className="text-white/20 text-sm">No applications submitted yet.</p>
                <Link href="/jobs" className="text-[#D4AF37] text-xs font-bold mt-4 inline-block hover:underline">Start Exploring</Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Alerts / Tips */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <span className="w-1.5 h-6 gold-gradient rounded-full" />
            Profile Integrity
          </h2>
          
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-6 rounded-2xl space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#D4AF37] mb-1">Verify Your CV</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Upload your latest CV to move from 'pending' to 'active' in the talent pool.
                </p>
              </div>
            </div>
            <Link href="/dashboard/talent/profile" className="w-full py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl text-xs font-bold text-[#D4AF37] block text-center hover:bg-[#D4AF37]/20 transition-all">
              Update Now
            </Link>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl mt-4">
            <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-white/40">Premium Tips</h4>
            <ul className="space-y-4">
              {[
                "Add at least 5 technical skills to your profile.",
                "Ensure your summary highlights outsourcing experience.",
                "Keep your phone number updated for interview calls."
              ].map((tip, i) => (
                <li key={i} className="flex gap-3 text-xs text-white/40">
                  <span className="text-[#D4AF37]">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
