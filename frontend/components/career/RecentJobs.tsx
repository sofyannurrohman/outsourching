"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Coins, ArrowRight, Loader2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { Job, PaginatedResponse } from "@/types";

export default function RecentJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get<PaginatedResponse<Job>>("/jobs", {
          params: { limit: 3 },
        });
        setJobs(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary mb-4">Kesempatan</p>
            <h2 className="text-4xl font-black text-white uppercase tracking-tight">Pekerjaan Terbaru</h2>
          </div>
          <Link href="/jobs" className="flex items-center gap-2 text-sm font-bold text-white group">
            Lihat Semua <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Mengambil Data Karier</p>
            </div>
          ) : (
            jobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="aws-card !bg-white/5 !border-white/10 p-10 flex flex-col h-full group hover:!border-primary/30 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center p-2">
                    {job.companyLogo ? (
                      <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain" />
                    ) : (
                      <Briefcase className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase">
                    HOT HIRING
                  </span>
                </div>

                <div className="mb-8 flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-white/40 font-medium mb-6">{job.companyName || "Mitra Solusi AWS"}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-white/40 font-bold uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-primary" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/40 font-bold uppercase tracking-wider">
                      <Coins className="w-4 h-4 text-primary" />
                      {job.salaryMin ? `${(job.salaryMin/1000000).toFixed(1)}Jt - ${(job.salaryMax!/1000000).toFixed(1)}Jt` : "Gaji Dirahasikan"}
                    </div>
                  </div>
                </div>

                <Link href={`/jobs/${job.id}`} className="block">
                  <button className="w-full py-4 rounded-xl border-2 border-white/10 text-white font-bold text-sm hover:bg-primary hover:text-black hover:border-primary transition-all uppercase tracking-widest">
                    Lamar Sekarang
                  </button>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
