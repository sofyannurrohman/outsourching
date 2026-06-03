"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Code, 
  Briefcase, 
  FileText, 
  Upload, 
  Plus, 
  X, 
  Loader2, 
  Save,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { Talent, ApiResponse } from "@/types";

const profileSchema = z.object({
  fullName: z.string().min(3, "Full name required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  summary: z.string().min(50, "Detailed summary required (min 50 chars)"),
  experienceYears: z.number().min(0),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function TalentProfileEditor() {
  const [profile, setProfile] = useState<Talent | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<ApiResponse<Talent>>("/talent/profile");
      const data = res.data.data;
      setProfile(data);
      setSkills(data.skills || []);
      reset({
        fullName: data.fullName,
        phone: data.phone || "",
        address: data.address || "",
        summary: data.summary || "",
        experienceYears: data.experienceYears,
      });
    } catch (err) {
      toast.error("Failed to load profile intelligence");
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    try {
      await api.put("/talent/profile", {
        full_name: data.fullName,
        phone: data.phone,
        address: data.address,
        summary: data.summary,
        skills: skills,
        experience_years: data.experienceYears,
      });
      toast.success("Elite Profile Synchronized!");
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-outfit font-bold mb-2">Profile Optimization</h1>
          <p className="text-white/40 text-sm">Refine your public intellectual identity for the global marketplace.</p>
        </div>
        <div className="flex gap-4">
           {!profile?.cvUrl && (
             <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-4 py-2 rounded-xl text-[10px] font-bold text-[#D4AF37] flex items-center gap-2 animate-pulse uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3.5 h-3.5" />
                CV Required for placement
             </div>
           )}
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
           {/* Tier 1: Identity */}
           <div className="space-y-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 flex items-center gap-3">
                 <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                 Primary Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Full Legal Name</label>
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                       <input 
                         {...register("fullName")}
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                       />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-[10px] font-bold">{errors.fullName.message}</p>}
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Primary Contact Number</label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                       <input 
                         {...register("phone")}
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                       />
                    </div>
                 </div>
              </div>
           </div>

           {/* Tier 2: Expertise */}
           <div className="space-y-8 pt-8 border-t border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 flex items-center gap-3">
                 <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                 Expertise & Placement Metrics
              </h3>
              
              <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Deployment Location</label>
                       <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input 
                            {...register("address")}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                            placeholder="e.g. Jakarta, ID"
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Industry Experience (Years)</label>
                       <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input 
                            type="number"
                            {...register("experienceYears", { valueAsNumber: true })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all font-bold"
                          />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Professional Executive Summary</label>
                    <textarea 
                      {...register("summary")}
                      rows={6}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all resize-none"
                      placeholder="Share your strategic professional trajectory..."
                    />
                    {errors.summary && <p className="text-red-500 text-[10px] font-bold">{errors.summary.message}</p>}
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Technical Stacks & Specializations</label>
                    <div className="flex gap-4 mb-4">
                       <input 
                         type="text"
                         value={skillInput}
                         onChange={(e) => setSkillInput(e.target.value)}
                         onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                         className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3.5 px-6 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                         placeholder="e.g. Cloud Architecture"
                       />
                       <button onClick={addSkill} type="button" className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                          Inject Skill
                       </button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[40px]">
                       {skills.map((skill, i) => (
                         <span key={i} className="px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold rounded-lg flex items-center gap-2">
                            {skill}
                            <X className="w-3.5 h-3.5 cursor-pointer hover:text-white" onClick={() => removeSkill(i)} />
                         </span>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="pt-8 flex gap-4">
              <button 
                disabled={isSaving}
                type="submit" 
                className="flex-1 btn-gold py-5 text-sm font-bold flex items-center justify-center gap-3 shadow-xl shadow-gold/10"
              >
                 {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                   <>
                     <Save className="w-5 h-5" />
                     Synchronize Profile
                   </>
                 )}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
}
