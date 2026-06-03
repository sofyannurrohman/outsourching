"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Plus, 
  X, 
  Loader2, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";

const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Detailed description required"),
  requirements: z.string().optional(),
  location: z.string().min(2, "Location required"),
  jobType: z.enum(["full-time", "part-time", "contract", "outsource"]),
  salaryMin: z.number().min(0),
  salaryMax: z.number().min(0),
  deadline: z.string().optional(),
  slots: z.number().min(1),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function NewJobPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobType: "outsource",
      slots: 1,
    }
  });

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true);
    try {
      await api.post("/company/jobs", {
        ...data,
        skills_required: skills,
      });
      toast.success("Elite Vacancy Published!");
      router.push("/dashboard/company");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to publish job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/company" className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-[#D4AF37] transition-all uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-white/20 tracking-[0.2em]">
           <span>Draft</span>
           <ChevronRight className="w-3 h-3" />
           <span className="text-[#D4AF37]">Publishing</span>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <ShieldCheck className="w-48 h-48 text-[#D4AF37]" />
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-3xl font-outfit font-bold mb-2">Publish New Vacancy</h1>
            <p className="text-white/40 text-sm">Define the requirements for your next mission-critical placement.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Essential Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input 
                    {...register("title")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                    placeholder="e.g. Senior Golang Architect"
                  />
                </div>
                {errors.title && <p className="text-red-500 text-[10px] font-bold">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Location / Workspace</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input 
                    {...register("location")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                    placeholder="e.g. Jakarta, ID (Hybrid)"
                  />
                </div>
                {errors.location && <p className="text-red-500 text-[10px] font-bold">{errors.location.message}</p>}
              </div>
            </div>

            {/* Type & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Contract Type</label>
                  <select 
                    {...register("jobType")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all appearance-none"
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Fixed Contract</option>
                    <option value="outsource">Managed Outsource</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Min Salary (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <input 
                      type="number"
                      {...register("salaryMin", { valueAsNumber: true })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                      placeholder="3000"
                    />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Max Salary (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                    <input 
                      type="number"
                      {...register("salaryMax", { valueAsNumber: true })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                      placeholder="5000"
                    />
                  </div>
               </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Strategic Mission (Description)</label>
                <textarea 
                  {...register("description")}
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all resize-none"
                  placeholder="Describe the role's impact and day-to-day responsibilities..."
                />
                {errors.description && <p className="text-red-500 text-[10px] font-bold">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Technical Stack / Skills Required</label>
                <div className="flex gap-4 mb-4">
                  <input 
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-6 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                    placeholder="e.g. Kubernetes"
                  />
                  <button 
                    type="button" 
                    onClick={addSkill}
                    className="px-6 py-3 bg-[#D4AF37] text-black text-xs font-bold rounded-xl hover:bg-[#D4AF37]/90 transition-all uppercase tracking-widest"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[32px]">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold rounded-lg flex items-center gap-2">
                      {skill}
                      <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => removeSkill(i)} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
               <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Application Deadline</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input 
                      type="date"
                      {...register("deadline")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all text-white/60"
                    />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Available Slots</label>
                  <input 
                    type="number"
                    {...register("slots", { valueAsNumber: true })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                  />
               </div>
            </div>

            <div className="pt-8">
              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full btn-gold py-5 text-sm font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <Plus className="w-5 h-5" />
                    Publish Vacancy
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
