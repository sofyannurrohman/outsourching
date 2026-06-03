"use client";

import React from "react";
import Link from "next/link";
import { Globe, Mail, Phone, MapPin, Share2, Search } from "lucide-react";

export default function MainFooter() {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Solutions", href: "#" },
        { name: "Expertise", href: "#" },
        { name: "About Us", href: "#" },
        { name: "Resources", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Our Services",
      links: [
        { name: "Talent Portal", href: "#" },
        { name: "Managed Outsourcing", href: "#" },
        { name: "Payroll Management", href: "#" },
        { name: "Training & Development", href: "#" },
        { name: "HRIS Services", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Compliance", href: "#" },
        { name: "Cookie Settings", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#051121] pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl font-black text-white tracking-widest uppercase">AWS</h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              PT AWS (AWS) is your best HR solutions partner in Indonesia. 
              We've been delivering excellence in workforce management and professional talent solutions since 2004.
            </p>
            <div className="flex gap-4">
              {[Share2, Search, Mail, Globe].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all">
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {footerLinks.map((col, i) => (
            <div key={i} className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/20">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} className="text-sm text-white/40 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
            © 2024 AWS HR Solutions Partner. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/10 uppercase tracking-widest">
            <Globe className="w-3 h-3" /> Built for Global Excellence
          </div>
        </div>
      </div>
    </footer>
  );
}
