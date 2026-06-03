"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Briefcase, MapPin, Clock, DollarSign, 
  ChevronLeft, Send, ShieldCheck, Star, 
  Loader2, CheckCircle2 
} from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { Job, ApiResponse } from "@/types";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { role, isAuthenticated } = useAuthStore();
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  const fetchJob = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<ApiResponse<Job>>(`/jobs/${id}`);
      setJob(res.data.data);
    } catch (err) {
      toast.error("Failed to load job details");
      router.push("/jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      toast.error("Please login first to apply");
      router.push("/login");
      return;
    }
    
    if (role !== "talent") {
      toast.error("Only talent accounts can apply for jobs");
      return;
    }

    setIsApplying(true);
    try {
      await api.post("/talent/applications", {
        jobId: id,
        coverLetter,
      });
      toast.success("Application submitted successfully!");
      setShowApplyModal(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center justify-center">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain" />
                  ) : (
                    <Briefcase className="w-8 h-8 text-[#D4AF37]" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-outfit font-bold">{job.title}</h1>
                  <p className="text-white/40">{job.companyName}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  {job.jobType}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                  {job.salaryMin ? `$${(job.salaryMin/1000).toFixed(0)}k - $${(job.salaryMax!/1000).toFixed(0)}k` : "Undisclosed"}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="w-1.5 h-6 gold-gradient rounded-full" />
                Job Description
              </h2>
              <div className="text-white/60 leading-relaxed whitespace-pre-wrap font-inter">
                {job.description}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="w-1.5 h-6 gold-gradient rounded-full" />
                Requirements
              </h2>
              <div className="text-white/60 leading-relaxed whitespace-pre-wrap font-inter">
                {job.requirements}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="w-1.5 h-6 gold-gradient rounded-full" />
                Desired Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skillsRequired.map((skill, i) => (
                  <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/70">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Action */}
          <div className="space-y-6">
            <div className="gold-border bg-white/[0.03] p-8 rounded-2xl sticky top-32 space-y-8">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Status</div>
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Actively Recruiting
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Deadline</div>
                <div className="text-white/80">{job.deadline || "Open until filled"}</div>
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Available Slots</div>
                <div className="text-white/80">{job.slots} Position(s)</div>
              </div>

              <button 
                onClick={() => router.push(`/jobs/${id}/apply`)}
                className="w-full btn-gold py-4 flex items-center justify-center gap-3 group"
              >
                Apply for this Role
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  Verified Premium Employer
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <Star className="w-4 h-4 text-[#D4AF37]" />
                  Managed by AWS SmartTalent
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#080808] border border-white/10 rounded-2xl p-8 shadow-2xl relative">
            <h3 className="text-2xl font-outfit font-bold mb-2">Submit Application</h3>
            <p className="text-sm text-white/40 mb-8">Tell the hiring team why you are the perfect fit for this role.</p>
            
            <form onSubmit={handleApply} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-white/40">Cover Letter</label>
                <textarea
                  required
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself and highlight your relevant experience..."
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-sm font-semibold hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={isApplying}
                  type="submit" 
                  className="flex-[2] btn-gold py-3 flex items-center justify-center gap-2"
                >
                  {isApplying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
