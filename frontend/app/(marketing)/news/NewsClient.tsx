"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CommonPageHero from "@/components/layout/CommonPageHero";
import { Calendar, ChevronRight, Camera } from "lucide-react";

export default function NewsPage() {
  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Berita & Galeri" },
  ];

  const newsItems = [
    {
      date: "12 Okt 2024",
      title: "AWS Raih Penghargaan Best HR Outsourcing Partner 2024",
      category: "Penghargaan",
      desc: "Komitmen kami dalam memberikan layanan terbaik kembali diakui di tingkat nasional melalui penghargaan bergengsi ini.",
      image: "/images/ai/aws_news_1.png",
    },
    {
      date: "05 Okt 2024",
      title: "Transformasi Digital: Implementasi Mobile HRIS Terbaru",
      category: "Inovasi",
      desc: "Kami resmi meluncurkan pembaruan sistem HRIS untuk mempermudah manajemen tenaga kerja secara real-time.",
      image: "/images/ai/aws_news_2.png",
    },
    {
      date: "28 Sep 2024",
      title: "Pelatihan Kepemimpinan Berkelanjutan bagi Tenaga Kerja Outsourcing",
      category: "Edukasi",
      desc: "Meningkatkan kualitas SDM melalui program pelatihan intensif di seluruh cabang AWS Indonesia.",
      image: "/images/ai/aws_news_3.png",
    }
  ];

  return (
    <main className="bg-background min-h-screen pb-24">
      <CommonPageHero
        title="Berita & Galeri"
        subtitle="Dapatkan informasi terbaru mengenai kegiatan, prestasi, dan inovasi terkini dari AWS."
        imageSrc="/images/news_hero_aws_1775822058170.png"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-7xl mx-auto px-6 mt-24">
        {/* News Grid */}
        <section className="mb-32">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tight">Berita Terkini</h2>
            <button className="text-primary font-bold text-sm uppercase tracking-widest border-b border-primary/30 pb-1">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {newsItems.map((item, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-[2rem] bg-secondary border border-white/5 mb-8 relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                   <Image 
                     src={item.image || "/images/ai/aws_hero_main.png"}
                     alt={item.title}
                     fill
                     className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                   />
                   <div className="absolute top-6 left-6 px-4 py-1.5 bg-primary/20 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/20 z-10">
                      {item.category}
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 text-white/30 text-xs font-bold mb-4 uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                <Camera className="w-8 h-8" />
             </div>
             <h2 className="text-4xl font-black text-white">Galeri Kegiatan</h2>
             <p className="text-white/40 mt-4 max-w-2xl mx-auto font-medium">Dokumentasi momen-momen berkesan di sepanjang perjalanan kami.</p>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
             {[1, 2, 3, 4, 5, 6].map((i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.05 }}
                 className={`relative rounded-[2.5rem] bg-secondary border border-white/5 overflow-hidden group h-${i % 2 === 0 ? '80' : '64'}`}
               >
                  <Image 
                    src={`/images/ai/aws_gallery_${i}.png`}
                    alt={`Gallery ${i}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                     <p className="text-xs font-bold text-white uppercase tracking-widest">Event Dokumentasi {i}</p>
                  </div>
               </motion.div>
             ))}
          </div>
        </section>
      </div>
    </main>
  );
}
