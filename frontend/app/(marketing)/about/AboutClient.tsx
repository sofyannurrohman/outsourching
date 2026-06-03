"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CommonPageHero from "@/components/layout/CommonPageHero";
import { ShieldCheck, Target, Users, History } from "lucide-react";

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami" },
  ];

  return (
    <main className="bg-background min-h-screen pb-24">
      <CommonPageHero
        title="Tentang Kami"
        subtitle="Membangun masa depan sumber daya manusia Indonesia yang profesional dan berintegritas sejak tahun 2004."
        imageSrc="/images/about_hero_aws_1775821849851.png"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-6 mt-24">
        {/* Sejarah Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <History className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-white">Sejarah Kami</h2>
            </div>
            <p className="text-lg text-white/60 leading-relaxed mb-6">
              Didirikan pada tahun 2004, PT AWS (AWS) hadir sebagai mitra strategis dalam pengelolaan sumber daya manusia. Sebagai bagian dari ekosistem bisnis yang luas di Indonesia, kami memahami dinamika pasar tenaga kerja nasional.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              Selama lebih dari dua dekade, kami telah bertransformasi dari penyedia tenaga kerja lokal menjadi salah satu pemimpin pasar dalam industri penyedia jasa solusi SDM (HR Solutions Partner) di Indonesia, melayani ratusan klien korporat dari berbagai sektor industri.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className="aspect-video rounded-[2.5rem] bg-secondary border border-white/5 relative overflow-hidden group">
                <Image 
                  src="/images/ai/aws_about_history.png"
                  alt="AWS History"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-6xl font-black italic pointer-events-none">
                   EST 2004
                </div>
             </div>
             <div className="gold-bracket-tl -mt-6 -ml-6" />
             <div className="gold-bracket-br -mb-6 -mr-6" />
          </motion.div>
        </section>

        {/* Visi & Misi Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-[2.5rem] bg-secondary border border-white/5 relative group"
          >
            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Visi Kami</h3>
            <p className="text-lg text-white/50 leading-relaxed italic">
              "Menjadi mitra strategis terpercaya yang memberikan solusi pengelolaan sumber daya manusia yang inovatif, profesional, dan bernilai tambah bagi seluruh stakeholder."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-12 rounded-[2.5rem] bg-secondary border border-white/5 relative group"
          >
            <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Misi Kami</h3>
            <ul className="space-y-4 text-white/50 text-base">
              <li className="flex gap-4">
                <span className="text-primary font-bold">1.</span>
                Menghasilkan tenaga kerja yang kompeten dan berintegritas tinggi.
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold">2.</span>
                Membangun sistem pengelolaan SDM yang modern dan efisien.
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold">3.</span>
                Memberikan pelayanan prima dan solusi yang adaptif terhadap kebutuhan bisnis klien.
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Nilai Perusahaan */}
        <section className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6"
          >
             <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary">Core Values</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16">Nilai Utama AWS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              { title: "Profesional", desc: "Mengerjakan setiap tugas dengan standar kualitas tertinggi.", icon: <Users /> },
              { title: "Integritas", desc: "Kejujuran dan etika dalam setiap langkah bisnis kami.", icon: <ShieldCheck /> },
              { title: "Inovatif", desc: "Selalu mencari cara baru yang lebih baik dalam melayani.", icon: <Target /> },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-xl shadow-primary/5 group-hover:bg-primary/5 transition-colors">
                  {React.cloneElement(value.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{value.title}</h4>
                <p className="text-sm text-white/40 max-w-[200px] leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
