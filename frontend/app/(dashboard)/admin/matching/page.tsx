"use client";

import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  User, 
  MapPin, 
  FileCheck, 
  Zap, 
  Plus, 
  Search, 
  Loader2, 
  ArrowRight,
  DollarSign,
  Calendar,
  ShieldCheck
} from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { Job, Talent, PaginatedResponse } from "@/types";

export default function AdminMatchingPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [talents, setTalents] = useState<Talent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  
  const [monthlyRate, setMonthlyRate] = useState("");
  const [platformFee, setPlatformFee] = useState("10");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [jobsRes, talentsRes] = await Promise.all([
        api.get<PaginatedResponse<Job>>("/jobs", { params: { limit: 50, status: "open" } }),
        api.get<PaginatedResponse<Talent>>("/admin/talents", { params: { limit: 50, status: "active" } }),
      ]);
      setJobs(jobsRes.data.data);
      setTalents(talentsRes.data.data);
    } catch (err) {
      toast.error("Failed to load matching candidates");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateContract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !selectedTalent) return;

    setIsCreating(true);
    try {
      await api.post("/admin/contracts", {
        job_id: selectedJob.id,
        talent_id: selectedTalent.id,
        company_id: selectedJob.companyId,
        monthly_rate: parseFloat(monthlyRate),
        platform_fee_pct: parseFloat(platformFee),
        start_date: new Date(),
        payment_terms: "Monthly Net 30",
      });
      toast.success("Elite Placement Contract Created Successfully!");
      setSelectedJob(null);
      setSelectedTalent(null);
      setMonthlyRate("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Contract generation failed");
    } finally {
      setIsCreating(false);
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
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-outfit font-bold mb-2">Matching Intelligence</h1>
        <p className="text-white/40 text-sm">Strategically align verified talent with corporate mission-critical vacancies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Step 1: Select Vacancy */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-bold text-sm border border-[#D4AF37]/20">1</div>
             <h3 className="text-lg font-bold">Select Active Vacancy</h3>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-4 max-h-[500px] overflow-y-auto space-y-3 custom-scrollbar">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => setSelectedJob(job)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                  selectedJob?.id === job.id 
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50 shadow-lg shadow-gold/5' 
                    : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold group-hover:text-[#D4AF37] transition-colors">{job.title}</h4>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">{job.jobType}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                   <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</div>
                   <span className="w-1 h-1 bg-white/10 rounded-full" />
                   <div className="text-[#D4AF37]/60 font-bold">{job.companyName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Select Matching Talent */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center font-bold text-sm border border-[#D4AF37]/20">2</div>
             <h3 className="text-lg font-bold">In-Pool Active Talent</h3>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-4 max-h-[500px] overflow-y-auto space-y-3 custom-scrollbar">
            {talents.map((talent) => (
              <div 
                key={talent.id} 
                onClick={() => setSelectedTalent(talent)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                  selectedTalent?.id === talent.id 
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50 shadow-lg shadow-gold/5' 
                    : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                         {talent.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{talent.fullName}</h4>
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{talent.experienceYears} Years Experience</p>
                      </div>
                   </div>
                   <Zap className={`w-4 h-4 ${selectedTalent?.id === talent.id ? 'text-[#D4AF37]' : 'text-white/10'}`} />
                </div>
                <div className="flex flex-wrap gap-2">
                   {talent.skills.slice(0, 4).map((s, i) => (
                     <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/5 text-[9px] text-white/40 rounded uppercase tracking-widest">{s}</span>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: Deployment Terms */}
      {selectedJob && selectedTalent && (
        <div className="mt-12 bg-white/[0.03] border border-[#D4AF37]/20 p-10 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <ShieldCheck className="w-48 h-48 text-[#D4AF37]" />
           </div>

           <div className="relative z-10 space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                 <div className="text-center p-6 border border-white/5 rounded-2xl w-full md:w-64 bg-black/20">
                    <div className="text-xs uppercase font-bold text-white/20 mb-3 tracking-widest">Candidate</div>
                    <div className="font-bold text-lg">{selectedTalent.fullName}</div>
                    <div className="text-xs text-[#D4AF37] mt-1">{selectedTalent.experienceYears} Years Exp.</div>
                 </div>
                 
                 <ArrowRight className="w-8 h-8 text-[#D4AF37] hidden md:block animate-pulse" />

                 <div className="text-center p-6 border border-white/5 rounded-2xl w-full md:w-64 bg-black/20">
                    <div className="text-xs uppercase font-bold text-white/20 mb-3 tracking-widest">Target Role</div>
                    <div className="font-bold text-lg">{selectedJob.title}</div>
                    <div className="text-xs text-[#D4AF37] mt-1">{selectedJob.companyName}</div>
                 </div>
              </div>

              <form onSubmit={handleCreateContract} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Monthly Rate (USD)</label>
                    <div className="relative">
                       <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                       <input 
                         type="number" 
                         required
                         value={monthlyRate}
                         onChange={(e) => setMonthlyRate(e.target.value)}
                         placeholder="e.g. 5000"
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all font-bold"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Platform Fee (%)</label>
                    <div className="relative">
                       <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                       <input 
                         type="number" 
                         value={platformFee}
                         onChange={(e) => setPlatformFee(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all font-bold"
                       />
                    </div>
                 </div>
                 <div className="flex items-end">
                    <button 
                      disabled={isCreating}
                      type="submit" 
                      className="w-full btn-gold py-4 flex items-center justify-center gap-3 shadow-xl shadow-gold/10"
                    >
                       {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                         <>
                           <FileCheck className="w-5 h-5" />
                           Finalize Placement
                         </>
                       )}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
