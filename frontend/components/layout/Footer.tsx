import React from "react";
import Link from "next/link";
import { Aperture, Video, Briefcase, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 flex items-center bg-transparent border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">
        <div className="order-2 md:order-1 mt-4 md:mt-0">
          © 2026 AWS SmartTalent. One System for All HR Needs.
        </div>
        <div className="order-1 md:order-2 flex gap-8">
          <Link href="#"><Aperture className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity" /></Link>
          <Link href="#"><Video className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity" /></Link>
          <Link href="#"><Briefcase className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity" /></Link>
          <Link href="#"><Globe className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity" /></Link>
        </div>
        <div className="order-3 flex gap-8">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
