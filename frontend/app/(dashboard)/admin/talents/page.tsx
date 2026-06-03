"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MoreVertical,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { Talent, PaginatedResponse } from "@/types";

export default function AdminTalentsPage() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTalents();
  }, [page, status]);

  const fetchTalents = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<PaginatedResponse<Talent>>("/admin/talents", {
        params: { page, limit: 10, search, status },
      });
      setTalents(res.data.data);
      setTotal(res.data.meta.total);
    } catch (err) {
      toast.error("Failed to load talent pool");
    } finally {
      setIsLoading(true); // Artificial delay or just end
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/admin/talents/${id}/status`, { status: newStatus });
      toast.success(`Talent ${newStatus} successfully`);
      fetchTalents();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-outfit font-bold mb-2">Talent Pool Governance</h1>
          <p className="text-white/40 text-sm">Review, approve, and manage elite candidates for placement.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search candidates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchTalents()}
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-[#D4AF37]/50 transition-colors w-64"
              />
           </div>
           <select 
             value={status}
             onChange={(e) => setStatus(e.target.value)}
             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/60 focus:outline-none focus:border-[#D4AF37]/50"
           >
              <option value="">All Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="active">Active/Approved</option>
              <option value="rejected">Rejected</option>
           </select>
        </div>
      </div>

      {/* Talent Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden min-h-[500px] flex flex-col relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Candidate</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Skills</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Exp.</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Status</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                   <td colSpan={5} className="py-32 text-center text-white/10 uppercase tracking-widest text-xs">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4 text-[#D4AF37]" />
                      Synchronizing Records
                   </td>
                </tr>
              ) : talents.length > 0 ? (
                talents.map((talent) => (
                  <tr key={talent.id} className="group hover:bg-white/[0.01] transition-all">
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#D4AF37]">
                             {talent.fullName?.charAt(0)}
                          </div>
                          <div>
                             <div className="text-sm font-semibold">{talent.fullName}</div>
                             <div className="text-xs text-white/30">{talent.email}</div>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex flex-wrap gap-2">
                          {talent.skills?.slice(0, 3).map((skill, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/50">{skill}</span>
                          ))}
                          {talent.skills?.length > 3 && <span className="text-[10px] text-white/30">+{talent.skills.length - 3}</span>}
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className="text-xs text-white/60 font-bold">{talent.experienceYears} Years</span>
                    </td>
                    <td className="px-8 py-5">
                       <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                         talent.poolStatus === 'pending' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                         talent.poolStatus === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                         'bg-white/5 text-white/40 border-white/10'
                       }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${talent.poolStatus === 'pending' ? 'bg-orange-500' : talent.poolStatus === 'active' ? 'bg-green-500' : 'bg-white/40'}`} />
                          {talent.poolStatus}
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2 opacity-100 group-hover:opacity-100 transition-opacity">
                          {talent.poolStatus === 'pending' && (
                             <>
                               <button 
                                 onClick={() => handleUpdateStatus(talent.id, 'active')}
                                 className="p-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-all shadow-sm"
                                 title="Approve Talent"
                               >
                                  <CheckCircle2 className="w-4 h-4" />
                               </button>
                               <button 
                                 onClick={() => handleUpdateStatus(talent.id, 'rejected')}
                                 className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all shadow-sm"
                                 title="Reject Talent"
                               >
                                  <XCircle className="w-4 h-4" />
                               </button>
                             </>
                          )}
                          <button className="p-2 grow border border-white/10 text-white/40 rounded-lg hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase">
                             <Eye className="w-4 h-4" />
                             Review Profile
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={5} className="py-20 text-center text-white/20 text-sm">No talents found matching the criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="mt-auto border-t border-white/5 p-6 flex items-center justify-between">
           <div className="text-xs text-white/30 uppercase tracking-widest font-bold">
              Showing {talents.length} of {total} Members
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-white/10 disabled:opacity-30 hover:bg-white/5 transition-all"
              >
                 <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPage(page + 1)}
                disabled={page * 10 >= total}
                className="p-2 rounded-xl border border-white/10 disabled:opacity-30 hover:bg-white/5 transition-all"
              >
                 <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
