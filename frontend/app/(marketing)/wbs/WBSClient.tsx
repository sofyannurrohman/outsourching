"use client";

import React from "react";
import { motion } from "framer-motion";
import CommonPageHero from "@/components/layout/CommonPageHero";
import { MessageSquare, Mail, ShieldAlert, CheckCircle, ArrowRight, ExternalLink } from "lucide-react";

export default function WBSPage() {
  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Whistle Blowing System" },
  ];

  return (
    <main className="bg-background min-h-screen pb-24">
      <CommonPageHero
        title="Whistle Blowing System"
        subtitle="Komitmen kami terhadap transparansi, integritas, dan profesionalisme dalam seluruh aspek operasional AWS."
        imageSrc="/images/wbs_hero_aws_1775822152258.png"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-6 mt-24">
        {/* Intro Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-red-500">Ethics & Compliance</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-8">Pelaporan Pelanggaran Etika dan Ketidakpuasan</h2>
            <p className="text-lg text-white/50 leading-relaxed mb-6">
              AWS menyediakan sistem whistleblowing yang independen dan rahasia untuk memfasilitasi karyawan, mitra bisnis, maupun pelanggan korporat kami dalam melaporkan tindakan yang melanggar hukum, etika, atau kebijakan perusahaan.
            </p>
            <p className="text-lg text-white/50 leading-relaxed mb-8">
              Khusus bagi mitra korporat, sistem ini juga berfungsi sebagai kanal resmi untuk menyampaikan keluhan atau laporan jika terdapat ketidakpuasan terhadap kinerja tenaga kerja outsourcing kami di lapangan.
            </p>
            
            <div className="space-y-4">
              {[
                 "Kerahasiaan Identitas Pelapor Terjamin",
                 "Perlindungan Terhadap Tindakan Balasan",
                 "Investigasi Profesional dan Objektif",
                 "Umpan Balik Status Pelaporan"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-white/80 font-medium">
                   <CheckCircle className="w-5 h-5 text-primary" />
                   {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Cards */}
          <div className="space-y-6">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="p-10 rounded-[3rem] bg-secondary border border-white/5 hover:border-primary/20 transition-all group"
            >
               <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-8">
                  <MessageSquare className="w-7 h-7" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4">Lapor via WhatsApp</h3>
               <p className="text-white/40 mb-8 text-sm leading-relaxed">
                  Layanan respon cepat melalui pesan instan WhatsApp untuk pelaporan awal dan konsultasi pelanggaran.
               </p>
               <a 
                 href="https://wa.me/6281112345678" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#25D366] text-black font-bold rounded-xl hover:bg-[#25D366]/90 transition-all text-sm"
               >
                  Kirim Pesan Sekarang <ExternalLink className="w-4 h-4" />
               </a>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="p-10 rounded-[3rem] bg-secondary border border-white/5 hover:border-primary/20 transition-all group"
            >
               <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                  <Mail className="w-7 h-7" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-4">Lapor via Email Resmi</h3>
               <p className="text-white/40 mb-8 text-sm leading-relaxed">
                  Gunakan email untuk pelaporan yang lebih detail dengan lampiran bukti pendukung yang lengkap.
               </p>
               <a 
                 href="mailto:wbs@aws.co.id" 
                 className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all text-sm"
               >
                  wbs@aws.co.id <ArrowRight className="w-4 h-4" />
               </a>
            </motion.div>
          </div>
        </section>

        {/* Reporting Process */}
        <section className="bg-secondary/30 p-16 rounded-[4rem] text-center">
           <h2 className="text-4xl font-black text-white mb-16">Alur Pelaporan WBS</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Laporan Masuk", desc: "Anda mengirimkan laporan melalui WA atau Email resmi.", icon: <Mail /> },
                { step: "02", title: "Verifikasi", desc: "Tim kepatuhan melakukan validasi awal laporan.", icon: <ShieldAlert /> },
                { step: "03", title: "Investigasi", desc: "Dilakukan pemeriksaan mendalam atas fakta di lapangan.", icon: <CheckCircle /> },
                { step: "04", title: "Tindak Lanjut", desc: "Pemberian sanksi atau perbaikan layanan kepada klien.", icon: <TargetIcon /> },
              ].map((step, idx) => (
                <div key={idx} className="relative group">
                   <div className="text-5xl font-black text-white/5 mb-6 group-hover:text-primary transition-colors">{step.step}</div>
                   <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                   <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              ))}
           </div>
        </section>
      </div>
    </main>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
