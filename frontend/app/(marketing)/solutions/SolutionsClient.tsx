"use client";

import React from "react";
import { motion } from "framer-motion";
import CommonPageHero from "@/components/layout/CommonPageHero";
import { Code, Briefcase, UserSearch, GraduationCap, ChevronRight } from "lucide-react";

export default function SolutionsPage() {
  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Solusi Kami" },
  ];

  const solutions = [
    {
      title: "Managed Services",
      desc: "Layanan pengelolaan tenaga kerja menyeluruh mulai dari administrasi, penggajian, hingga pemantauan kinerja, sehingga Anda dapat fokus pada bisnis inti Anda.",
      icon: <Briefcase />,
      features: ["Payroll Outsourcing", "Human Capital Management", "Compliance & Legal Support"]
    },
    {
      title: "Recruitment & Assessment",
      desc: "Menemukan talenta terbaik melalui proses seleksi yang ketat dan berbasis kompetensi menggunakan teknologi asesmen terkini.",
      icon: <UserSearch />,
      features: ["Executive Search", "Mass Recruitment", "Psychology Assessment"]
    },
    {
      title: "HR Information System",
      desc: "Platform digital terintegrasi untuk mengotomatisasi proses HR Anda, meningkatkan efisiensi dan transparansi data karyawan.",
      icon: <Code />,
      features: ["Attendance System", "Employee Self Service (ESS)", "Digital Reporting"]
    },
    {
      title: "Training & Development",
      desc: "Program pengembangan kurikulum dan pelatihan untuk meningkatkan kapasitas dan kualitas sumber daya manusia perusahaan Anda.",
      icon: <GraduationCap />,
      features: ["Soft Skills Training", "Leadership Development", "Certified Programs"]
    }
  ];

  return (
    <main className="bg-background min-h-screen pb-24">
      <CommonPageHero
        title="Solusi Kami"
        subtitle="Menyediakan ekosistem solusi SDM yang komprehensif dan inovatif untuk mendukung pertumbuhan bisnis Anda."
        imageSrc="/images/solutions_hero_aws_1775821901450.png"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-6 mt-24">
        {/* Intro Section */}
        <section className="text-center max-w-4xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-8"
          >
            Satu Ekosistem untuk Seluruh Kebutuhan SDM Anda
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "4px" }}
            viewport={{ once: true }}
            className="w-24 h-1 gold-gradient mx-auto mb-8"
          />
          <p className="text-lg text-white/50 leading-relaxed">
            AWS hadir dengan berbagai layanan yang dirancang secara spesifik untuk menjawab tantangan pengelolaan tenaga kerja di era modern. Kami menggabungkan pengalaman panjang dengan teknologi terkini untuk memberikan hasil yang maksimal.
          </p>
        </section>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {solutions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-10 rounded-[3rem] bg-secondary border border-white/5 hover:border-primary/20 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/40 mb-8 leading-relaxed h-20">
                {item.desc}
              </p>
              
              <ul className="space-y-4 pt-8 border-t border-white/5">
                {item.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-white/60">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    {feat}
                  </li>
                ))}
              </ul>
              
              <button className="mt-10 text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Pelajari Selengkapnya <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Expertise Mini CTA */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-16 rounded-[4rem] gold-gradient relative overflow-hidden text-black text-center"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Butuh Solusi Custom?</h2>
            <p className="text-lg font-medium opacity-70 mb-10 max-w-2xl mx-auto">
              Setiap perusahaan memiliki tantangan unik. Konsultasikan kebutuhan spesifik SDM Anda dengan tim ahli kami.
            </p>
            <button className="bg-black text-white font-bold px-12 py-4 rounded-2xl hover:bg-black/80 transition-all shadow-2xl">
              Hubungi Konsultan Kami
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        </motion.section>
      </div>
    </main>
  );
}
