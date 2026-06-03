"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Zap, Star, Crown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Ideal for early-stage startups and occasional hiring.",
    icon: <ShieldCheck className="w-6 h-6 text-white/40" />,
    features: [
      "1 Active Job Slot",
      "Standard Profile Visibility",
      "Basic Matching Algorithm",
      "Community Support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Basic",
    price: "$199",
    period: "/month",
    description: "Standard plan for growing companies with regular vacancies.",
    icon: <Zap className="w-6 h-6 text-[#D4AF37]" />,
    features: [
      "5 Active Job Slots",
      "Priority Matching",
      "Talent Pool Access (Limited)",
      "Standard Support",
      "Basic Analytics",
    ],
    buttonText: "Go Basic",
    popular: false,
  },
  {
    name: "Pro",
    price: "$499",
    period: "/month",
    description: "Best for established businesses with scaling needs.",
    icon: <Star className="w-6 h-6 text-[#D4AF37]" />,
    features: [
      "20 Active Job Slots",
      "Full Talent Pool Insights",
      "Direct Messaging",
      "Priority Review for Roles",
      "24/7 Priority Support",
      "API Access",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Comprehensive solutions for large scale outsourcing.",
    icon: <Crown className="w-6 h-6 text-[#D4AF37]" />,
    features: [
      "Unlimited Job Slots",
      "Dedicated Placement Manager",
      "Custom Talent Verification",
      "White-Glove Matchmaking",
      "Quarterly Strategy Review",
      "SSO & Custom Integration",
    ],
    buttonText: "Contact Us",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black pt-40 pb-20 px-6 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-8">
            <ShieldCheck className="w-3 h-3 fill-[#D4AF37]" />
            Elite Subscription Models
          </div>
          <h1 className="text-5xl md:text-7xl font-outfit font-bold leading-tight mb-8">
            Invest in <span className="gold-gradient bg-clip-text text-transparent">Elite Performance</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-inter leading-relaxed">
            Transparent pricing designed for every stage of your business growth. 
            Choose the level of service that fits your placement strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                tier.popular 
                  ? "bg-white/[0.05] border-[#D4AF37]/50 shadow-2xl shadow-gold/10 scale-105 z-10" 
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8 p-3 w-fit rounded-2xl bg-white/5 border border-white/10">
                {tier.icon}
              </div>

              <h3 className="text-lg font-bold mb-2 uppercase tracking-wider text-white/80">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className={`text-4xl font-outfit font-bold ${tier.popular ? "text-[#D4AF37]" : "text-white"}`}>
                  {tier.price}
                </span>
                {tier.period && <span className="text-white/40 text-sm">{tier.period}</span>}
              </div>
              <p className="text-sm text-white/40 mb-8 leading-relaxed font-inter">
                {tier.description}
              </p>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/60">
                    <Check className={`w-4 h-4 mt-0.5 ${tier.popular || idx < 3 ? "text-[#D4AF37]" : "text-white/20"}`} />
                    <span className="text-left font-inter">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/register/company"
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 group transition-all ${
                  tier.popular 
                    ? "btn-gold" 
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                {tier.buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Note Strip */}
        <div className="mt-24 p-12 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h4 className="text-xl font-bold mb-2">Need a custom solution?</h4>
            <p className="text-sm text-white/40 italic">We provide bespoke placement strategy for multinational enterprises.</p>
          </div>
          <button className="px-8 py-3 rounded-xl border border-white/10 font-semibold hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all">
            Talk to Strategy Expert
          </button>
        </div>
      </div>
    </div>
  );
}
