"use client";

import React from "react";
import { motion } from "framer-motion";
import CommonPageHero from "@/components/layout/CommonPageHero";
import { MapPin, Phone, Mail, Clock, Send, Globe } from "lucide-react";

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Hubungi Kami" },
  ];

  return (
    <main className="bg-background min-h-screen pb-24">
      <CommonPageHero
        title="Hubungi Kami"
        subtitle="Tim kami siap membantu menjawab pertanyaan Anda dan memberikan solusi SDM terbaik untuk bisnis Anda."
        imageSrc="/images/contact_hero_aws_1775822236145.png"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-12">
            <div>
               <h2 className="text-3xl font-black text-white mb-8 tracking-tight">Informasi Kontak</h2>
               <div className="space-y-8">
                  <div className="flex gap-6 group">
                     <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <MapPin className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Kantor Pusat</p>
                        <p className="text-white/60 text-sm leading-relaxed">Jl. Gatot Subroto No.Kav 9-11, Jakarta Selatan, 12930</p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <Phone className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Telepon & WhatsApp</p>
                        <p className="text-white/60 text-sm leading-relaxed">(021) 1234 5678<br />+62 811 1234 5678</p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <Mail className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Email Resmi</p>
                        <p className="text-white/60 text-sm leading-relaxed">info@aws.co.id<br />marketing@aws.co.id</p>
                     </div>
                  </div>

                  <div className="flex gap-6 group">
                     <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <Clock className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Jam Operasional</p>
                        <p className="text-white/60 text-sm leading-relaxed">Senin - Jumat: 08.00 - 17.00 WIB</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Branch Locations List (Mockup) */}
            <div className="pt-12 border-t border-white/5">
               <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Globe className="w-4 h-4 text-primary" />
                  Jaringan Kantor Cabang
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  {["Bandung", "Surabaya", "Medan", "Makassar", "Semarang", "Palembang"].map((city, idx) => (
                    <div key={idx} className="px-4 py-2 rounded-lg bg-secondary border border-white/5 text-[11px] font-medium text-white/50 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer">
                       Cabang {city}
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
             <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-[3rem] bg-secondary border border-white/5 relative overflow-hidden"
             >
                <div className="relative z-10">
                   <h3 className="text-2xl font-bold text-white mb-10">Kirim Pesan Langsung</h3>
                   <form className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Nama Lengkap</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-primary/50 focus:outline-none transition-all" placeholder="Contoh: Budi Santoso" />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Email Perusahaan</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-primary/50 focus:outline-none transition-all" placeholder="budi@perusahaan.com" />
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Subjek</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white/50 focus:border-primary/50 focus:outline-none transition-all appearance-none cursor-pointer">
                               <option>Kerjasama Solusi SDM</option>
                               <option>Layanan Recruitment</option>
                               <option>Implementasi HRIS</option>
                               <option>Informasi Lainnya</option>
                            </select>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Nomor Telepon</label>
                            <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-primary/50 focus:outline-none transition-all" placeholder="081234567890" />
                         </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Pesan Anda</label>
                         <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-sm text-white focus:border-primary/50 focus:outline-none transition-all resize-none" placeholder="Tuliskan detail kebutuhan atau pertanyaan Anda di sini..."></textarea>
                      </div>

                      <button className="btn-gold w-full py-5 flex items-center justify-center gap-4 group">
                         Kirim Pesan Sekarang <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                   </form>
                </div>

                {/* Background patterns */}
                <div className="absolute top-0 right-0 w-96 h-96 gold-gradient opacity-[0.03] rounded-full translate-x-1/2 -translate-y-1/2" />
             </motion.div>
          </div>
        </div>

        {/* Map Placeholder */}
        <section className="h-[500px] w-full bg-secondary rounded-[4rem] border border-white/5 overflow-hidden relative group">
           <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
              <div className="w-20 h-20 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-700">
                 <MapPin className="w-10 h-10" />
              </div>
              <div className="text-center">
                 <h4 className="text-2xl font-black text-white mb-2">Google Maps Integration</h4>
                 <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Klik untuk memuat peta interaktif</p>
              </div>
           </div>
           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </section>
      </div>
    </main>
  );
}
