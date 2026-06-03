"use client";

import React from "react";
import { 
  Headphones, 
  User, 
  Users, 
  Star, 
  Building2, 
  ShieldCheck 
} from "lucide-react";
import { motion } from "framer-motion";

export default function JobCategories() {
  const cats = [
    { name: "Petugas Dukungan", count: "145 Lowongan", icon: <Headphones className="w-6 h-6" /> },
    { name: "Staf", count: "89 Lowongan", icon: <User className="w-6 h-6" /> },
    { name: "Supervisor", count: "32 Lowongan", icon: <Users className="w-6 h-6" /> },
    { name: "Manajerial", count: "12 Lowongan", icon: <Star className="w-6 h-6" />, active: true },
    { name: "Frontliner", count: "210 Lowongan", icon: <Building2 className="w-6 h-6" /> },
    { name: "Keamanan", count: "450 Lowongan", icon: <ShieldCheck className="w-6 h-6" /> },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary mb-4">Spesialisasi</p>
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">Kategori Posisi</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {cats.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-[2rem] border transition-all duration-300 text-center flex flex-col items-center group cursor-pointer ${
                cat.active 
                ? "bg-primary border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/20" 
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                cat.active ? "bg-black text-primary" : "bg-white/10 text-white/40 group-hover:text-primary"
              }`}>
                {cat.icon}
              </div>
              <h4 className={`text-sm font-black mb-2 whitespace-nowrap ${cat.active ? "text-black" : "text-white"}`}>{cat.name}</h4>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${cat.active ? "text-black/60" : "text-white/20"}`}>{cat.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
