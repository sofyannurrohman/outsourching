"use client";

import React from "react";
import CareerHero from "@/components/career/CareerHero";
import CareerSearch from "@/components/career/CareerSearch";
import RecentJobs from "@/components/career/RecentJobs";
import JobCategories from "@/components/career/JobCategories";
import CareerTrust from "@/components/career/CareerTrust";
import LocationNetwork from "@/components/career/LocationNetwork";

export default function CareerPage() {
  return (
    <div className="bg-background min-h-screen">
      <CareerHero />
      <CareerSearch />
      <RecentJobs />
      <JobCategories />
      <CareerTrust />
      <LocationNetwork />
    </div>
  );
}
