"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Users, 
  MapPin, 
  DollarSign, 
  Plus, 
  X, 
  Loader2, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Eye,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { Job, Application, ApiResponse, PaginatedResponse } from "@/types";

export default function CompanyJobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [job, setJob] = useState<Job | null>(null);
  const [apps, setApps] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    fetchJobAndApps();
  }, [id]);

  const fetchJobAndApps = async () => {
    setIsLoading(true);
    try {
      const [jobRes, appsRes] = await Promise.all([
        api.get<ApiResponse<Job>>(`/jobs/${id}`),
        api.get<PaginatedResponse<Application>>(`/company/jobs/${id}/applications`),
      ]);
      setJob(jobRes.data.data);
      setApps(appsRes.data.data);
    } catch (err) {
      toast.error("Failed to load vacancy details");
      router.push("/dashboard/company");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (appId: string, status: string) => {
    setIsUpdating(true);
    try {
      await api.patch(`/company/applications/${appId}/status`, {
        status,
        admin_note: adminNote,
      });
      toast.success(`Candidate ${status} successfully`);
      setSelectedApp(null);
      setAdminNote("");
      fetchJobAndApps();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update candidate status");
    } finally {
      setIsUpdating(false);
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
      <div className="flex items-center justify-between">
        <Link href="/dashboard/company" className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-[#D4AF37] transition-all uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>
        <div className="flex gap-3">
           <button className="px-6 py-2.5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 transition-all">
              Pause Vacancy
           </button>
           <button className="btn-gold text-xs px-6 py-2.5 flex items-center gap-2">
              Edit Details
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Summary Left Column */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                 <Briefcase className="w-20 h-20 text-[#D4AF37]" />
              </div>

              <div>
                 <div className={`inline-flex px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border mb-4 ${
                   job?.status === 'open' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-white/40 border-white/10'
                 }`}>
                    {job?.status}
                 </div>
                 <h1 className="text-2xl font-outfit font-bold">{job?.title}</h1>
                 <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-bold mt-2">{job?.jobType} Role</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-white/30">Location</span>
                    <span className="font-bold flex items-center gap-2">{job?.location} <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /></span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-white/30">Budget</span>
                    <span className="font-bold text-[#D4AF37]">${job?.salaryMin?.toLocaleString() || '0'} - ${job?.salaryMax?.toLocaleString() || '0'}</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-white/30">Deadline</span>
                    <span className="font-bold flex items-center gap-2">{job?.deadline || 'No Deadline'} <Calendar className="w-3.5 h-3.5 text-white/20" /></span>
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] uppercase font-bold text-white/20 tracking-[0.2em]">Required Stacks</label>
                 <div className="flex flex-wrap gap-2">
                    {job?.skillsRequired.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 text-[9px] text-white/40 rounded uppercase tracking-widest">{s}</span>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Applicants Right Column */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-3">
                 <span className="w-1.5 h-6 gold-gradient rounded-full" />
                 Candidates ({apps.length})
              </h2>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] uppercase font-bold text-white/20">Sort By</span>
                 <select className="bg-transparent border-none text-[10px] uppercase font-bold text-[#D4AF37] focus:ring-0">
                    <option>Recent First</option>
                    <option>By Score</option>
                 </select>
              </div>
           </div>

           <div className="space-y-4">
              {apps.length > 0 ? (
                apps.map((app) => (
                  <div key={app.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between group hover:border-[#D4AF37]/30 transition-all gap-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#D4AF37] text-lg">
                          J
                       </div>
                       <div>
                          <div className="font-bold flex items-center gap-2">
                             Full Name <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                          </div>
                          <div className="flex items-center gap-3 text-xs text-white/40 mt-1">
                             <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Applied 2h ago</span>
                             <span className={`px-2 py-0.5 rounded uppercase tracking-widest font-bold text-[9px] border ${
                               app.status === 'pending' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                               app.status === 'reviewed' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                               'bg-green-500/10 text-green-500 border-green-500/20'
                             }`}>
                                {app.status}
                             </span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                       <button 
                         onClick={() => setSelectedApp(app)}
                         className="px-4 py-2 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 transition-all flex items-center gap-2"
                       >
                          <Eye className="w-3.5 h-3.5" />
                          Review
                       </button>
                       <button className="p-2 border border-white/10 rounded-xl hover:text-[#D4AF37] transition-all">
                          <FileText className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 border border-dashed border-white/10 rounded-3xl text-center">
                   <p className="text-white/20 text-sm">No candidates have applied to this mission yet.</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Review Modal Placeholder */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-lg">
           <div className="bg-black/60 border border-white/10 p-10 rounded-[3rem] w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in-95 backdrop-blur-3xl">
              <div className="flex justify-between items-start mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37] text-black font-bold flex items-center justify-center rounded-2xl text-xl">
                       J
                    </div>
                    <div>
                       <h3 className="text-xl font-bold">Candidate Review</h3>
                       <p className="text-white/30 text-xs mt-1 uppercase tracking-widest">Candidate ID: {selectedApp.id.slice(0,8)}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="space-y-6">
                 <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em] mb-3 block">Corporate Decision Note</label>
                    <textarea 
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows={4}
                      className="w-full bg-transparent border-none text-sm p-0 focus:ring-0 resize-none"
                      placeholder="Enter feedback for internal review or candidate notification..."
                    />
                 </div>

                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <button 
                      onClick={() => handleUpdateStatus(selectedApp.id, 'shortlisted')}
                      className="py-4 border border-blue-500/30 text-blue-400 rounded-2xl text-xs font-bold hover:bg-blue-500/10 transition-all flex flex-col items-center gap-2"
                    >
                       <ShieldCheck className="w-5 h-5" />
                       Shortlist
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedApp.id, 'rejected')}
                      className="py-4 border border-red-500/30 text-red-400 rounded-2xl text-xs font-bold hover:bg-red-500/10 transition-all flex flex-col items-center gap-2"
                    >
                       <XCircle className="w-5 h-5" />
                       Reject
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedApp.id, 'hired')}
                      className="py-4 bg-[#D4AF37] text-black rounded-2xl text-xs font-bold hover:bg-[#D4AF37]/90 transition-all flex flex-col items-center gap-2 col-span-2 lg:col-span-1 shadow-gold/20 shadow-xl"
                    >
                       <CheckCircle2 className="w-5 h-5" />
                       Hire Talent
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
