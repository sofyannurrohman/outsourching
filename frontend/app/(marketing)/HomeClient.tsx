"use client";

import React from "react";
import Hero from "@/components/landing/Hero";
import TrustLogos from "@/components/landing/TrustLogos";
import Metrics from "@/components/landing/Metrics";
import Excellence from "@/components/landing/Excellence";
import Insights from "@/components/landing/Insights";
import FAQAccordion from "@/components/landing/FAQAccordion";
import FinalCTA from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Hero />
      <TrustLogos />
      <Metrics />
      <Excellence />
      <Insights />
      <FAQAccordion />
      <FinalCTA />
    </div>
  );
}
