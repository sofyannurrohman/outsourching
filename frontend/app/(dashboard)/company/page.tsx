"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Users, 
  Plus, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Star,
  Loader2,
  CheckCircle,
  Gem
} from "lucide-react";
import { api } from "@/lib/api";
import { Company, Job, ApiResponse, PaginatedResponse } from "@/types";
import { useAuthStore } from "@/store/auth";

export default function CompanyDashboardPage() {
  const { userId } = useAuthStore();
  const [profile, setProfile] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [profileRes, jobsRes] = await Promise.all([
        api.get<ApiResponse<Company>>("/company/profile"),
        api.get<PaginatedResponse<Job>>("/company/jobs", { params: { limit: 5 } }),
      ]);
      setProfile(profileRes.data.data);
      setJobs(jobsRes.data.data);
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
            Managing <span className="gold-gradient bg-clip-text text-transparent">{profile?.companyName}</span>
          </h1>
          <p className="text-white/40 text-sm">Grow your elite team with global placement strategies.</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <Link href="/dashboard/company/jobs/new" className="btn-gold text-xs px-6 py-2.5 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Post New Job
          </Link>
          <Link href="/dashboard/company/talent-search" className="px-6 py-2.5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 transition-all">
            Find Talent
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Roles", val: jobs.length, icon: Briefcase, color: "text-blue-400" },
          { label: "Total Applicants", val: 0, icon: Users, color: "text-[#D4AF37]" },
          { label: "Plan Status", val: profile?.subscriptionPlan, icon: Gem, color: "text-purple-400" },
          { label: "Verification", val: profile?.isVerified ? "Verified" : "Pending", icon: ShieldCheck, color: "text-green-400" },
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
        {/* Managed Roles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <span className="w-1.5 h-6 gold-gradient rounded-full" />
              Active Job Posts
            </h2>
            <Link href="/dashboard/company/jobs" className="text-xs text-[#D4AF37] hover:underline uppercase tracking-widest font-bold">
              Manage All
            </Link>
          </div>
          
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-[#D4AF37]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white/20" />
                    </div>
                    <div>
                      <h4 className="font-bold group-hover:text-[#D4AF37] transition-colors">{job.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-white/40 mt-1">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 0 Applicants</span>
                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Status: {job.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <Link href={`/dashboard/company/jobs/${job.id}`} className="p-2 border border-white/10 rounded-lg hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all">
                        <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 border border-dashed border-white/10 rounded-3xl text-center">
                <p className="text-white/20 text-sm">You haven't posted any jobs yet.</p>
                <Link href="/dashboard/company/jobs/new" className="text-[#D4AF37] text-xs font-bold mt-4 inline-block hover:underline">Create First Vacancy</Link>
              </div>
            )}
          </div>
        </div>

        {/* Managed Placement Side Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <span className="w-1.5 h-6 gold-gradient rounded-full" />
            Subscription info
          </h2>
          
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]">
                  <Star className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold">{profile?.subscriptionPlan} Individual</h4>
                  <p className="text-xs text-white/40">Renews on Oct 12, 2026</p>
               </div>
            </div>
            
            <div className="space-y-2">
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/30">
                  <span>Job Slots Usage</span>
                  <span>{jobs.length} / {profile?.subscriptionPlan === 'free' ? 1 : 5}</span>
               </div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full gold-gradient" 
                    style={{ width: `${(jobs.length / (profile?.subscriptionPlan === 'free' ? 1 : 5)) * 100}%` }} 
                  />
               </div>
            </div>

            <Link href="/pricing" className="w-full py-3 border border-[#D4AF37]/50 text-[#D4AF37] rounded-xl text-sm font-bold block text-center hover:bg-[#D4AF37]/10 transition-all">
                Upgrade Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
