"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CareerHero() {
  return (
    <section className="relative pt-40 pb-32 bg-secondary overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -ml-40 -mb-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary mb-6">
              Keunggulan Eksekutif
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
              SISTEM SOLUSI <br />SDM
            </h1>
            <p className="text-lg text-white/50 mb-12 max-w-lg leading-relaxed">
              Membangun Masa Depan Sumber Daya Manusia Indonesia yang Profesional dan Berintegritas.
            </p>
            <Link href="/jobs" className="btn-gold px-10 py-5 text-sm uppercase tracking-[0.2em] inline-block">
              Mulai Karir Anda
            </Link>
          </motion.div>

          {/* Right Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-[12px] border-white/5 shadow-2xl aspect-[4/3] group">
              <Image 
                src="/images/ai/aws_career_hero.png"
                alt="Professional Executive"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Decorative Frame Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
            </div>
            
            {/* Design Brackets */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-primary/40 rounded-tl-[3rem]" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-primary/40 rounded-br-[3rem]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
