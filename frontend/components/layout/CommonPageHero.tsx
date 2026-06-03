"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CommonPageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function CommonPageHero({ title, subtitle, imageSrc, breadcrumbs }: CommonPageHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden bg-secondary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-3xl">
          {/* Breadcrumbs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                {bc.href ? (
                  <a href={bc.href} className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary hover:text-white transition-colors">
                    {bc.label}
                  </a>
                ) : (
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">
                    {bc.label}
                  </span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <span className="text-white/20 text-[10px]">/</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Title and Subtitle */}
          <div className="relative inline-block">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]"
            >
              {title}
            </motion.h1>
            
            {/* Gold Brackets */}
            <div className="gold-bracket-tl -mt-10 -ml-10 opacity-50" />
            <div className="gold-bracket-br -mb-10 -mr-10 opacity-50" />
          </div>

          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/60 leading-relaxed font-medium mt-4 max-w-2xl italic"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
