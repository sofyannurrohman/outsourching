"use client";

import React, { useState } from "react";
import { ChevronDown, Plus, Minus, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apa saja layanan utama yang ditawarkan oleh AWS?",
      a: "AWS menawarkan berbagai solusi SDM mulai dari Recruitment & Selection, Managed Outsourcing, Payroll Management, hingga Training & Development yang membantu mengoptimalkan performa bisnis Anda.",
    },
    {
      q: "Bagaimana proses rekrutmen di AWS?",
      a: "Proses rekrutmen kami melibatkan screening ketat, psikotes, hingga interview kompetensi untuk memastikan talenta yang kami salurkan memenuhi standar kualifikasi mitra kami.",
    },
    {
      q: "Apakah AWS memiliki kantor perwakilan di seluruh Indonesia?",
      a: "Ya, kami memiliki 35 kantor cabang yang tersebar di seluruh wilayah Indonesia untuk memberikan dukungan operasional yang cepat dan efisien bagi seluruh mitra kami.",
    },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Accordion */}
          <div>
            <h2 className="text-4xl font-black text-white mb-12 uppercase tracking-tight">
              Pertanyaan yang <br />Sering Diajukan
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-white/5 last:border-0 pb-4">
                  <button 
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span className={`text-lg font-bold transition-colors ${openIndex === idx ? "text-primary" : "text-white group-hover:text-primary"}`}>
                      {faq.q}
                    </span>
                    <div className={`p-2 rounded-full transition-transform ${openIndex === idx ? "rotate-180 bg-primary/10 text-primary" : "text-white/20"}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/50 leading-relaxed pb-8">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-secondary p-12 rounded-[3rem] text-center flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 relative">
               <Megaphone className="w-10 h-10 text-primary rotate-12" />
               <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
            </div>

            <h3 className="text-3xl font-black text-white mb-4">Masih Memiliki Pertanyaan?</h3>
            <p className="text-white/40 text-sm mb-10 max-w-[280px]">
              Tim kami siap membantu Anda memberikan solusi terbaik untuk kebutuhan SDM perusahaan Anda.
            </p>
            
            <Link href="/contact" className="btn-gold w-full max-w-[240px] flex items-center justify-center">
              Hubungi Kami
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
