"use client";

import React from "react";
import { Users, Shield, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Metrics() {
  const stats = [
    { label: "Mitra Strategis", value: "+300", icon: <Shield className="w-8 h-8 text-primary" /> },
    { label: "Karyawan Berkualitas", value: "+50.000", icon: <Users className="w-8 h-8 text-primary" /> },
    { label: "Kantor Cabang Nasional", value: "35", icon: <MapPin className="w-8 h-8 text-primary" /> },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="aws-card !bg-white/5 !border-white/10 p-12 text-center flex flex-col items-center gap-6 group hover:!border-primary/30 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-5xl font-black text-white mb-2">{stat.value}</h3>
                <p className="text-xs uppercase font-bold tracking-[0.2em] text-white/40">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
