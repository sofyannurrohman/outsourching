"use client";

import React from "react";
import { CheckCircle2, Share2, Cpu, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Excellence() {
  const features = [
    {
      title: "Pengalaman",
      desc: "Lebih dari 20 tahun keahlian dalam menangani pengelolaan tenaga kerja berskala besar di berbagai industri.",
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    },
    {
      title: "Jaringan",
      desc: "Kehadiran nasional terbesar di Indonesia dengan 35 pusat operasional untuk melayani Anda lebih baik.",
      icon: <Share2 className="w-6 h-6 text-primary" />,
    },
    {
      title: "Teknologi",
      desc: "Platform digital terintegrasi untuk penggajian, kehadiran, dan manajemen siklus hidup rekrutmen.",
      icon: <Cpu className="w-6 h-6 text-primary" />,
    },
    {
      title: "Skala",
      desc: "Solusi adaptif yang dirancang untuk tumbuh bersama organisasi Anda dari rintisan hingga korporasi besar.",
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary mb-4">Mengapa AWS</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Standar Keunggulan <br />Profesional
            </h2>
          </div>
          <p className="text-white/50 text-lg max-w-md lg:pt-12">
            Kami menggabungkan puluhan tahun pengalaman dengan teknologi mutakhir untuk memberikan solusi SDM ujung-ke-ujung yang berkembang sesuai kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl border border-white/5 hover:border-primary/20 hover:bg-white/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{f.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
