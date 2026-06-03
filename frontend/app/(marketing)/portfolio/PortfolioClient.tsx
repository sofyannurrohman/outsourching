"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CommonPageHero from "@/components/layout/CommonPageHero";
import { Award, Building, BarChart, CheckCircle2 } from "lucide-react";

export default function PortfolioPage() {
  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Portofolio" },
  ];

  const stats = [
    { val: "200+", label: "Klien Korporat", icon: <Building /> },
    { val: "100k+", label: "Tenaga Kerja Dikelola", icon: <BarChart /> },
    { val: "20th+", label: "Pengalaman Industri", icon: <Award /> },
    { val: "95%", label: "Tingkat Retensi Klien", icon: <CheckCircle2 /> }
  ];

  const industries = [
    "Perbankan & Keuangan", "Manufaktur", "Logistik & Transportasi", 
    "Teknologi Informasi", "Ritel & Konsumer", "Energi & Sumber Daya Alam",
    "Layanan Kesehatan", "Pemerintahan"
  ];

  return (
    <main className="bg-background min-h-screen pb-24">
      <CommonPageHero
        title="Portofolio Kami"
        subtitle="Melihat jejak keberhasilan AWS dalam memberdayakan bisnis di seluruh penjuru Indonesia."
        imageSrc="/images/portfolio_hero_aws_1775821975448.png"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-6 mt-24">
        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-secondary border border-white/5 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
              </div>
              <div className="text-4xl font-black text-white mb-2">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </section>

        {/* Industry Reach */}
        <section className="mb-32">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary">Industry Focus</span>
                </div>
                <h2 className="text-4xl font-black text-white mb-8">Jangkauan Industri yang Luas</h2>
                <p className="text-lg text-white/50 leading-relaxed mb-8">
                  Keahlian kami tidak terbatas pada satu sektor. AWS telah sukses mengimplementasikan solusi SDM di berbagai industri dengan tantangan yang beragam, memberikan kami perspektif luas dalam mengelola tenaga kerja.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {industries.map((industry, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white/70 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {industry}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="aspect-square bg-white/5 rounded-[4rem] border border-white/10 relative overflow-hidden flex items-center justify-center -rotate-3 group"
               >
                  <Image 
                    src="/images/ai/aws_portfolio_industries.png"
                    alt="AWS Industries"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-40"
                  />
                  <Building className="w-48 h-48 text-white/5 relative z-10" />
               </motion.div>
               <div className="gold-bracket-tl -mt-8 -ml-8 opacity-40" />
               <div className="gold-bracket-br -mb-8 -mr-8 opacity-40" />
            </div>
          </div>
        </section>

        {/* Client Recognition (Testimonial Mockup) */}
        <section className="bg-secondary/50 border border-white/5 p-16 rounded-[4rem] text-center">
           <QuoteIcon className="w-16 h-16 text-primary opacity-30 mx-auto mb-8" />
           <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-medium text-white/80 italic leading-relaxed max-w-4xl mx-auto mb-12"
           >
              "AWS telah menjadi mitra yang luar biasa dalam membantu kami menskala operasional melalui penyediaan tenaga kerja yang berkualitas dan sistem manajemen yang transparan."
           </motion.p>
           <h5 className="text-white font-bold text-lg mb-1 tracking-tight">Direktur Operasional</h5>
           <p className="text-primary text-sm font-bold uppercase tracking-widest">Institusi Perbankan Terkemuka</p>
        </section>
      </div>
    </main>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.89543 10.9124 7 12.017 7H19.017C20.1216 7 21.017 7.89543 21.017 9V15C21.017 15.5523 21.5693 16 22.017 16V21H14.017ZM3.01697 21L3.01697 18C3.01697 16.8954 3.9124 16 5.01697 16H8.01697C8.56925 16 9.01697 15.5523 9.01697 15V9C9.01697 8.44772 8.56925 8 8.01697 8H4.01697C3.46468 8 3.01697 8.44772 3.01697 9V12C3.01697 12.5523 2.56925 13 2.01697 13H0.0169678C-0.535317 13 -0.983032 12.5523 -0.983032 12V9C-0.983032 7.89543 -0.0876022 7 1.01697 7H8.01697C9.12154 7 10.017 7.89543 10.017 9V15C10.017 15.5523 10.5693 16 11.017 16V21H3.01697Z" />
    </svg>
  );
}
