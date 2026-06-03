"use client";

import React from "react";
import { Building2, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function LocationNetwork() {
  const cities = [
    { name: "Jakarta", img: "https://images.unsplash.com/photo-1555661530-6893fd2bc722?auto=format&fit=crop&q=80&w=200" },
    { name: "Medan", img: "https://images.unsplash.com/photo-1589111394474-0545f284534f?auto=format&fit=crop&q=80&w=200" },
    { name: "Purwokerto", img: "https://images.unsplash.com/photo-1627443831836-8fc790408542?auto=format&fit=crop&q=80&w=200" },
    { name: "Mataram", img: "https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?auto=format&fit=crop&q=80&w=200" },
    { name: "Surabaya", img: "https://images.unsplash.com/photo-1601633615431-7243c2134aa1?auto=format&fit=crop&q=80&w=200" },
    { name: "35 Kantor", icon: <Building2 className="w-8 h-8 text-white" />, special: true },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary mb-4">Jaringan</p>
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">Lowongan Kantor AWS</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          {cities.map((city, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center gap-6 group cursor-pointer"
            >
              <div className={`w-24 h-24 rounded-[2rem] overflow-hidden shadow-xl transition-all duration-300 ${
                city.special 
                ? "bg-secondary flex items-center justify-center p-6 border-4 border-primary/20 scale-110" 
                : "group-hover:scale-110 group-hover:rotate-3"
              }`}>
                {city.img ? (
                  <img src={city.img} alt={city.name} className="w-full h-full object-cover" />
                ) : (
                  city.icon
                )}
              </div>
              <div className="text-center">
                <span className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${
                  city.special ? "text-primary" : "text-white/40 group-hover:text-primary"
                }`}>
                  {city.name}
                </span>
                {city.special && <div className="mt-1 flex items-center justify-center gap-1 text-[8px] font-bold text-white/20 uppercase tracking-widest"><MapPin className="w-2 h-2" /> Seluruh Indonesia</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
