"use client";

import React from "react";
import { Search, Briefcase, GraduationCap, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function CareerSearch() {
  return (
    <div className="relative -mt-16 z-20 max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-secondary rounded-[2rem] shadow-2xl p-4 md:p-6 border border-white/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Profession */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Cari Profesi</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="misal: Sales Officer"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Kategori</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-sm font-medium text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer">
                <option className="bg-secondary">Semua Kategori</option>
                <option className="bg-secondary">Frontend</option>
                <option className="bg-secondary">Backend</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Pengalaman</label>
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-sm font-medium text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer">
                <option className="bg-secondary">Semua Pengalaman</option>
                <option className="bg-secondary">Entry Level</option>
                <option className="bg-secondary">Middle</option>
                <option className="bg-secondary">Senior</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <button className="btn-gold h-[60px] rounded-2xl flex items-center justify-center gap-3 font-bold hover:scale-[1.02] transition-all active:scale-[0.98]">
            <Search className="w-5 h-5" />
            Cari Lowongan
          </button>
        </div>
      </motion.div>
    </div>
  );
}
