"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Building2, 
  Mail, 
  Globe, 
  MapPin, 
  FileText, 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  Save, 
  Loader2, 
  Gem,
  Upload,
  ArrowRight
} from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { Company, ApiResponse } from "@/types";

const companySchema = z.object({
  companyName: z.string().min(2, "Company name required"),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  website: z.string().url("Valid URL required").optional().or(z.literal("")),
  description: z.string().min(20, "Detailed description required"),
  address: z.string().optional(),
  npwp: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function CompanyProfileEditor() {
  const [profile, setProfile] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<ApiResponse<Company>>("/company/profile");
      const data = res.data.data;
      setProfile(data);
      reset({
        companyName: data.companyName,
        industry: data.industry || "",
        companySize: data.companySize || "",
        website: data.website || "",
        description: data.description || "",
        address: data.address || "",
        npwp: data.npwp || "",
      });
    } catch (err) {
      toast.error("Failed to load corporate identity");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CompanyFormValues) => {
    setIsSaving(true);
    try {
      await api.put("/company/profile", {
        company_name: data.companyName,
        industry: data.industry,
        company_size: data.companySize,
        website: data.website,
        description: data.description,
        address: data.address,
        npwp: data.npwp,
      });
      toast.success("Corporate Profile Synchronized!");
      fetchProfile();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Optimization failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-outfit font-bold mb-2">Corporate Identity</h1>
          <p className="text-white/40 text-sm">Refine your organization's placement brand and verification standing.</p>
        </div>
        <div className="flex gap-4">
           {profile?.isVerified ? (
             <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl text-[10px] font-bold text-green-500 flex items-center gap-2 uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Partner
             </div>
           ) : (
             <div className="bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-xl text-[10px] font-bold text-orange-400 flex items-center gap-2 animate-pulse uppercase tracking-[0.2em]">
                <ShieldAlert className="w-3.5 h-3.5" />
                Under Verification
             </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Form */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl">
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Organization Legal Name</label>
                        <div className="relative">
                           <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                           <input 
                             {...register("companyName")}
                             className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Global Domain (Website)</label>
                        <div className="relative">
                           <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                           <input 
                             {...register("website")}
                             className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                             placeholder="https://..."
                           />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Industry Sector</label>
                         <input 
                           {...register("industry")}
                           className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                           placeholder="e.g. Fintech Solutions"
                         />
                     </div>
                     <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Organization Scale</label>
                         <select 
                           {...register("companySize")}
                           className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all appearance-none"
                         >
                            <option value="">Select Size</option>
                            <option value="1-50">1-50 Elite</option>
                            <option value="51-200">51-200 Scaling</option>
                            <option value="201-1000">201-1000 Enterprise</option>
                            <option value="1000+">1000+ Global</option>
                         </select>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Corporate Narrative (Description)</label>
                     <textarea 
                       {...register("description")}
                       rows={5}
                       className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all resize-none"
                       placeholder="Share your mission and placement criteria..."
                     />
                  </div>

                  <div className="space-y-2 pt-4">
                      <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Legal Tax Identity (NPWP)</label>
                      <input 
                        {...register("npwp")}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                        placeholder="00.000.000.0-000.000"
                      />
                      <p className="text-[9px] text-white/20 italic mt-2">NPWP is required for corporate verification and mission publication.</p>
                  </div>

                  <button 
                    disabled={isSaving}
                    type="submit" 
                    className="w-full btn-gold py-5 text-sm font-bold flex items-center justify-center gap-3 shadow-xl shadow-gold/10"
                  >
                     {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                       <>
                         <Save className="w-5 h-5" />
                         Finalize Identity
                       </>
                     )}
                  </button>
               </form>
            </div>
         </div>

         {/* Right Column: Status & Subscription */}
         <div className="space-y-6">
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-8 rounded-3xl space-y-6">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]">
                     <Gem className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold capitalize">{profile?.subscriptionPlan} Individual</h3>
                     <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Premium Tier</p>
                  </div>
               </div>
               
               <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="text-xs text-white/40 leading-relaxed">
                     Your current status allows for up to 5 mission publications. Upgrade to **Pro** for unlimited elite placements.
                  </div>
                  <button className="w-full py-3 border border-[#D4AF37]/50 text-[#D4AF37] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2">
                     Tier Insights <ArrowRight className="w-3 h-3" />
                  </button>
               </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl space-y-6">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Corporate Assets</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-xs text-white/50">Official Logo</span>
                     <button className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest hover:underline">Replace</button>
                  </div>
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                     {profile?.logoUrl ? (
                        <img src={profile.logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
                     ) : (
                        <Building2 className="w-6 h-6 text-white/10" />
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
