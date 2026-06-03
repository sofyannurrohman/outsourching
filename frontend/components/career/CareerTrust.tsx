"use client";

import React from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function CareerTrust() {
  return (
    <section className="py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
          >
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="AWS Office" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[2px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-transform mb-6">
                   <Play className="w-8 h-8 fill-current translate-x-1" />
                </div>
                <div className="text-center">
                  <h4 className="text-2xl font-black text-white mb-2">Profil Korporat AWS</h4>
                  <p className="text-white/60 text-sm uppercase tracking-[0.2em] font-bold">Mendefinisikan masa depan tenaga kerja Indonesia</p>
                </div>
              </div>
            </div>
            {/* Decorative dots or patterns outside */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right: Copy + Stats */}
          <div>
            <h2 className="text-4xl font-black text-white mb-10 leading-tight">
              Dipercaya oleh Ribuan <br /> Profesional
            </h2>
            <p className="text-white/50 leading-relaxed mb-12 max-w-lg">
              AWS (PT AWS) berdedikasi untuk menyediakan sumber daya manusia berkualitas tinggi bagi sektor keuangan dan lainnya. Komitmen kami terhadap pengembangan profesional memastikan bahwa setiap kandidat siap menghadapi tantangan bisnis modern.
            </p>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-4xl font-black text-white mb-2">25+</h3>
                <p className="text-[10px] uppercase font-black tracking-widest text-primary">Tahun Pengalaman</p>
              </div>
              <div>
                <h3 className="text-4xl font-black text-white mb-2">50rb+</h3>
                <p className="text-[10px] uppercase font-black tracking-widest text-primary">Karyawan Terpenuhi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
