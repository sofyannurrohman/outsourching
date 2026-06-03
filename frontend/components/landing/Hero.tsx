"use client";

import React from "react";
import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary">
                Sumber Daya Manusia Unggulan
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8">
              Membangun Masa Depan <br />
              Sumber Daya Manusia <br />
              Indonesia Yang <br />
              <span className="text-primary italic">Profesional</span>
            </h1>
            
            <p className="text-lg text-white/50 max-w-lg mb-10 leading-relaxed">
              Kami menyediakan solusi SDM mutakhir untuk membantu bisnis Anda berkembang dengan talenta dan sistem yang tepat. 
              Keunggulan dalam pengelolaan tenaga kerja sejak 2004.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link href="/contact" className="btn-gold flex items-center gap-3">
                Mulai Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="btn-outline flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-primary text-primary" />
                </div>
                Tonton Video
              </button>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/images/ai/aws_hero_main.png" 
                alt="AWS Professional"
                width={800}
                height={1000}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            
            {/* Gold Frame Brackets */}
            <div className="gold-bracket-tl -mt-8 -ml-8" />
            <div className="gold-bracket-br -mb-8 -mr-8" />
            
            {/* Floating Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-secondary/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-20 max-w-[200px]"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-1.5 h-6 gold-gradient rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Sukses</span>
              </div>
              <p className="text-sm font-medium text-white/80 italic">
                "Mitra Rekrutmen Terbaik 2024"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
