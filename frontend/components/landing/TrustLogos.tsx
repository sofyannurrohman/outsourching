"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TrustLogos() {
  const partners = ["PNM", "PEGADAIAN", "BRI finance", "BFI Finance", "IFG"];

  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/20 mb-12">
          Trusted by Industry Leaders
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40">
          {partners.map((partner) => (
            <motion.div
              key={partner}
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="text-2xl md:text-3xl font-black text-white tracking-tighter"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
