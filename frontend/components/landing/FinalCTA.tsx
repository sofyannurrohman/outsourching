"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#0A1F3D] rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden border border-white/5"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-[1.1]">
              Tunggu Apa <br className="hidden md:block" /> Lagi?
            </h2>
            <p className="text-lg text-white/50 mb-12">
              Ubah tenaga kerja Anda menjadi keunggulan kompetitif hari ini. 
              Bergabunglah dengan ratusan pemimpin industri yang mempercayai AWS untuk keunggulan SDM mereka.
            </p>
            <Link href="/contact" className="btn-gold !bg-white !text-secondary font-black px-10 py-5 rounded-2xl hover:!bg-white/90 transition-all uppercase tracking-[0.2em] text-sm active:scale-[0.98] inline-block">
              Mulai Sekarang
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
