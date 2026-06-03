"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Loader2, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { Job, ApiResponse } from "@/types";
import MultiStepApplicationForm from "@/components/career/MultiStepApplicationForm";

export default function ApplyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  const fetchJob = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<ApiResponse<Job>>(`/jobs/${id}`);
      setJob(res.data.data);
    } catch (err) {
      router.push("/jobs");
    } finally {
      setIsLoading(false);
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
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" />
          Cancel Application
        </button>

        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest border border-[#D4AF37]/20">
            <Sparkles className="w-3 h-3" />
            Elite Placement
          </div>
          <h1 className="text-4xl md:text-5xl font-outfit font-bold">
            Apply for <span className="gold-gradient bg-clip-text text-transparent">{job.title}</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">
            at {job.companyName} &bull; {job.jobType} &bull; {job.location}
          </p>
        </div>

        <MultiStepApplicationForm job={job} />
      </div>
    </div>
  );
}
