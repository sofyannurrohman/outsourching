"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Briefcase, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { Job, PaginatedResponse } from "@/types";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<PaginatedResponse<Job>>("/jobs", {
        params: { search, limit: 10 },
      });
      setJobs(res.data.data);
      setTotal(res.data.meta.total);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-outfit font-bold mb-4">
              Explore <span className="gold-gradient bg-clip-text text-transparent">Elite Roles</span>
            </h1>
            <p className="text-white/40">Find your next placement among hundreds of premium opportunities.</p>
          </div>
          <div className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
            {total} Jobs Available
          </div>
        </div>

        {/* Search & Filter Bar */}
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4 mb-16">
          <div className="flex-1 relative min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              placeholder="Search by title, skills, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
          </div>
          <button type="submit" className="btn-gold px-8 py-4 flex items-center gap-2">
            Search
          </button>
          <button type="button" className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all font-semibold text-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </form>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
              <p className="text-white/30 uppercase tracking-[0.3em] text-xs">Loading Opportunities</p>
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <Link 
                key={job.id} 
                href={`/jobs/${job.id}`}
                className="group gold-border p-8 bg-white/[0.02] rounded-2xl flex flex-col gap-6 hover:translate-y-[-4px] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 overflow-hidden p-2 flex items-center justify-center">
                      {job.companyLogo ? (
                        <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain" />
                      ) : (
                        <Briefcase className="w-6 h-6 text-[#D4AF37]" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-[#D4AF37] transition-colors">{job.title}</h3>
                      <p className="text-white/40 text-sm">{job.companyName}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest border border-[#D4AF37]/20">
                    {job.jobType}
                  </div>
                </div>

                <p className="text-white/50 text-sm line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4 mt-auto border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/30">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/30">
                    <Clock className="w-3.5 h-3.5" />
                    Today
                  </div>
                  <div className="ml-auto text-sm font-bold gold-gradient bg-clip-text text-transparent">
                    {job.salaryMin ? `$${(job.salaryMin/1000).toFixed(0)}k - $${(job.salaryMax!/1000).toFixed(0)}k` : "Salary Undisclosed"}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-2xl">
              <p className="text-white/40">No elite jobs found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
