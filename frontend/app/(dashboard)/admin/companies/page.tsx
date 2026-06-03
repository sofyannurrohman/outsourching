"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Search, 
  MapPin, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Gem
} from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { Company, PaginatedResponse } from "@/types";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [isVerified, setIsVerified] = useState<string>("");

  useEffect(() => {
    fetchCompanies();
  }, [page, isVerified]);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<PaginatedResponse<Company>>("/admin/companies", {
        params: { page, limit: 10, search, isVerified },
      });
      setCompanies(res.data.data);
      setTotal(res.data.meta.total);
    } catch (err) {
      toast.error("Failed to load company records");
    } finally {
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/admin/companies/${id}/status`, { status });
      toast.success(`Company status updated: ${status}`);
      fetchCompanies();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Verification update failed");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-outfit font-bold mb-2">Corporate Verification</h1>
          <p className="text-white/40 text-sm">Review legal credentials and manage corporate placement partners.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search by company name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchCompanies()}
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-[#D4AF37]/50 transition-colors w-64"
              />
           </div>
           <select 
             value={isVerified}
             onChange={(e) => setIsVerified(e.target.value)}
             className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/60 focus:outline-none focus:border-[#D4AF37]/50"
           >
              <option value="">Verification Status</option>
              <option value="false">Pending Verification</option>
              <option value="true">Verified Partners</option>
           </select>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden min-h-[500px] flex flex-col relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Organization</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Region/Sector</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Subscription</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Account Integrity</th>
                <th className="px-8 py-5 text-xs uppercase tracking-widest text-white/30 font-bold">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                   <td colSpan={5} className="py-32 text-center text-white/10 uppercase tracking-widest text-xs">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-4 text-[#D4AF37]" />
                      Authenticating Corporate Records
                   </td>
                </tr>
              ) : companies.length > 0 ? (
                companies.map((company) => (
                  <tr key={company.id} className="group hover:bg-white/[0.01] transition-all">
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                             {company.logoUrl ? (
                                <img src={company.logoUrl} alt={company.companyName} className="w-full h-full object-contain p-1" />
                             ) : (
                                <Building2 className="w-5 h-5 text-white/20" />
                             )}
                          </div>
                          <div>
                             <div className="text-sm font-semibold group-hover:text-[#D4AF37] transition-colors">{company.companyName}</div>
                             <div className="text-xs text-white/30 line-clamp-1">{company.email}</div>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-white/60">
                             <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                             {company.address || 'Jakarta, ID'}
                          </div>
                          <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                             {company.industry || 'Technology'}
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2">
                          <Gem className={`w-4 h-4 ${company.subscriptionPlan === 'pro' ? 'text-[#D4AF37]' : 'text-white/20'}`} />
                          <span className="text-xs text-white/60 font-bold capitalize">{company.subscriptionPlan}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                         company.isVerified ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                       }`}>
                          {company.isVerified ? <CheckCircle2 className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                          {company.isVerified ? 'Verified Partner' : 'Pending Verification'}
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2 opacity-100 group-hover:opacity-100 transition-all">
                          {!company.isVerified ? (
                             <button
                               onClick={() => handleUpdateStatus(company.id, 'active')}
                               className="p-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-all font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                               title="Verify Company"
                             >
                                <CheckCircle2 className="w-4 h-4" />
                                Verify
                             </button>
                          ) : (
                            <button
                               onClick={() => handleUpdateStatus(company.id, 'suspended')}
                               className="p-2 border border-red-500/20 text-red-500/60 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-all font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                               title="Suspend Access"
                             > 
                                <ShieldAlert className="w-4 h-4" />
                                Suspend
                             </button>
                          )}
                          <button className="p-2 border border-white/10 text-white/30 rounded-lg hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all" title="View Full Details">
                             <Eye className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={5} className="py-20 text-center text-white/20 text-sm italic">No organizations found matching the filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="mt-auto border-t border-white/5 p-6 flex items-center justify-between">
           <div className="text-xs text-white/30 uppercase font-bold tracking-[0.2em]">
              Showing Registry {companies.length} of {total} Partners
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 rounded-xl border border-white/10 disabled:opacity-30 hover:bg-white/5 transition-all text-white/40"
              >
                 <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-4 py-2 text-xs font-bold bg-white/5 rounded-xl border border-white/10">Page {page}</div>
              <button 
                onClick={() => setPage(page + 1)}
                disabled={page * 10 >= total}
                className="p-2 rounded-xl border border-white/10 disabled:opacity-30 hover:bg-white/5 transition-all text-white/40"
              >
                 <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
