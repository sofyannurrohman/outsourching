"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Insights() {
  const posts = [
    {
      title: "Meningkatkan Keunggulan Kepemimpinan di Era Digital",
      date: "24 OKT, 2025",
      image: "/images/ai/aws_news_3.png",
      cat: "KEPEMIMPINAN",
    },
    {
      title: "Implementasi Solusi Manajemen Tenaga Kerja Strategis",
      date: "18 OKT, 2025",
      image: "/images/ai/aws_news_2.png",
      cat: "MANAJEMEN",
    },
    {
      title: "Masa Depan Outsourcing: Pendekatan Kemitraan Strategis",
      date: "10 OKT, 2025",
      image: "/images/ai/aws_news_1.png",
      cat: "OUTSOURCING",
    },
  ];

  return (
    <section className="py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary mb-4">Wawasan Terbaru</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Apa Yang Ada di AWS</h2>
          </div>
          <Link href="/news" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary group">
            Lihat Semua Wawasan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 shadow-lg">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full">
                  <span className="text-[10px] font-black tracking-widest text-secondary">{post.cat}</span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-white/40 tracking-widest mb-4 uppercase">{post.date}</p>
              <h4 className="text-2xl font-bold text-white mb-6 leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <Link href="/news" className="flex items-center gap-2 text-xs font-bold text-white/60 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                Baca Selengkapnya <div className="w-6 h-[1px] bg-primary group-hover:w-10 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
