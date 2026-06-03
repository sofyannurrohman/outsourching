"use client";

import React, { useState, useEffect } from "react";
import { 
  User, Briefcase, Plus, Trash2, 
  ChevronRight, ChevronLeft, Send, 
  Loader2, CheckCircle2, Globe,
  Link as LinkIcon, Calendar, DollarSign,
  GraduationCap
} from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "@/lib/api";
import { Job, Talent, ApiResponse } from "@/types";
import { useRouter } from "next/navigation";

interface MultiStepFormProps {
  job: Job;
}

interface Skill {
  id: string;
  name: string;
}

export default function MultiStepApplicationForm({ job }: MultiStepFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [masterSkills, setMasterSkills] = useState<Skill[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: "",
    phone: "",
    location: "",
    
    // Step 2: Professional Info
    currentJobTitle: "",
    experienceYears: 0,
    expectedSalary: 0,
    workType: "onsite",
    availability: "available",
    availableFrom: "",
    skills: [] as { skill_id: string; level: string; years_experience: number }[],

    // Step 3: Additional Info
    experiences: [] as any[],
    educations: [] as any[],
    portfolioUrl: "",
    linkedinUrl: "",

    // Step 4: Screening
    coverLetter: "",
    screeningQuestions: {
      motivation: "",
      relevantExperience: "",
    }
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [profileRes, skillsRes] = await Promise.all([
        api.get<ApiResponse<Talent>>("/talent/profile"),
        api.get<ApiResponse<Skill[]>>("/skills")
      ]);

      const profile = profileRes.data.data;
      setMasterSkills(skillsRes.data.data);

      if (profile) {
        setFormData(prev => ({
          ...prev,
          fullName: profile.fullName || "",
          phone: profile.phone || "",
          location: profile.city || "",
          currentJobTitle: profile.currentJobTitle || "",
          experienceYears: profile.experienceYears || 0,
          expectedSalary: profile.expectedSalary || 0,
          workType: profile.workType || "onsite",
          availability: profile.availability || "available",
          portfolioUrl: profile.portfolioUrl || "",
          linkedinUrl: profile.linkedinUrl || "",
        }));
      }
    } catch (err) {
      console.error("Failed to load profile data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/talent/applications", {
        job_id: job.id,
        ...formData
      });
      toast.success("Application submitted successfully!");
      router.push("/dashboard/talent/applications");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { company_name: "", position: "", start_date: "", end_date: "", description: "" }]
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      educations: [...prev.educations, { institution: "", major: "", degree: "", start_year: new Date().getFullYear(), end_year: new Date().getFullYear() }]
    }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
        <p className="text-white/30 uppercase tracking-[0.3em] text-xs">Preparing Application Form</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all
              ${step >= i ? "bg-[#D4AF37] text-black" : "bg-white/5 text-white/20 border border-white/10"}
            `}>
              {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
            </div>
            {i < 4 && (
              <div className={`w-16 md:w-24 h-px mx-2 ${step > i ? "bg-[#D4AF37]" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="gold-border bg-white/[0.02] p-8 md:p-12 rounded-3xl max-w-3xl mx-auto shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <h2 className="text-2xl font-outfit font-bold">Basic Information</h2>
                <p className="text-white/40 text-sm">Let&apos;s start with your foundational contact details.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder="e.g. +62812345678"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Current Location (City)</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      required
                      type="text"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      placeholder="e.g. Jakarta Selatan"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PROFESSIONAL INFO */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <h2 className="text-2xl font-outfit font-bold">Professional Details</h2>
                <p className="text-white/40 text-sm">Help us match your expertise with this role.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Current Job Title</label>
                  <input
                    type="text"
                    value={formData.currentJobTitle}
                    onChange={e => setFormData({...formData, currentJobTitle: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder="e.g. Senior Frontend Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Expected Salary (IDR)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="number"
                      value={formData.expectedSalary}
                      onChange={e => setFormData({...formData, expectedSalary: parseInt(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Preferred Work Type</label>
                  <select
                    value={formData.workType}
                    onChange={e => setFormData({...formData, workType: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white/60 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  >
                    <option value="onsite">Onsite</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Availability Status</label>
                  <select
                    value={formData.availability}
                    onChange={e => setFormData({...formData, availability: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white/60 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  >
                    <option value="available">Available Now</option>
                    <option value="notice_period">Notice Period</option>
                    <option value="working">Currently Working</option>
                  </select>
                </div>
              </div>

              {/* Skills Multi-Selection (Simplified for MVP) */}
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest font-bold text-white/40">Select Your Master Skills</label>
                <div className="flex flex-wrap gap-2">
                  {masterSkills.map(skill => {
                    const isSelected = formData.skills.some(s => s.skill_id === skill.id);
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setFormData({...formData, skills: formData.skills.filter(s => s.skill_id !== skill.id)});
                          } else {
                            setFormData({...formData, skills: [...formData.skills, { skill_id: skill.id, level: "intermediate", years_experience: 1 }]});
                          }
                        }}
                        className={`
                          px-4 py-2 rounded-lg border text-xs font-medium transition-all
                          ${isSelected ? "bg-[#D4AF37] border-[#D4AF37] text-black" : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"}
                        `}
                      >
                        {skill.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ADDITIONAL INFO */}
          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <h2 className="text-2xl font-outfit font-bold">Experience & Education</h2>
                <p className="text-white/40 text-sm">Provide a snapshot of your professional journey.</p>
              </div>

              {/* Experiences */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Work Experience
                  </h3>
                  <button 
                    type="button" onClick={addExperience}
                    className="text-xs flex items-center gap-1 text-white/40 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New
                  </button>
                </div>
                
                {formData.experiences.map((exp, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4 relative group">
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, experiences: formData.experiences.filter((_, idx) => idx !== i)})}
                      className="absolute top-2 right-2 text-white/10 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        placeholder="Company Name" 
                        value={exp.company_name}
                        onChange={e => {
                          const newExp = [...formData.experiences];
                          newExp[i].company_name = e.target.value;
                          setFormData({...formData, experiences: newExp});
                        }}
                        className="bg-black/20 border border-white/5 rounded-lg p-3 text-xs focus:border-[#D4AF37]/30 transition-colors" 
                      />
                      <input 
                        placeholder="Position" 
                        value={exp.position}
                        onChange={e => {
                          const newExp = [...formData.experiences];
                          newExp[i].position = e.target.value;
                          setFormData({...formData, experiences: newExp});
                        }}
                        className="bg-black/20 border border-white/5 rounded-lg p-3 text-xs focus:border-[#D4AF37]/30 transition-colors" 
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">LinkedIn URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={e => setFormData({...formData, linkedinUrl: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Portfolio URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={e => setFormData({...formData, portfolioUrl: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      placeholder="github.com/... or behance.net/..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SCREENING */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <h2 className="text-2xl font-outfit font-bold">Screening Questions</h2>
                <p className="text-white/40 text-sm">Final step! Tell us more about your interest in this role.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Motivation / Why applying?</label>
                  <textarea
                    required
                    value={formData.screeningQuestions.motivation}
                    onChange={e => setFormData({
                      ...formData, 
                      screeningQuestions: {...formData.screeningQuestions, motivation: e.target.value}
                    })}
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                    placeholder="Briefly explain what excites you about this opportunity..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Relevant Experience Detail</label>
                  <textarea
                    required
                    value={formData.screeningQuestions.relevantExperience}
                    onChange={e => setFormData({
                      ...formData, 
                      screeningQuestions: {...formData.screeningQuestions, relevantExperience: e.target.value}
                    })}
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                    placeholder="Highlight your most relevant work experience for this specific role..."
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-[#D4AF37] focus:ring-offset-black" />
                  <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                    I confirm that the information provided is accurate and I am ready to be contacted for the next screening stages.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 pt-8 border-t border-white/5">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-[1] px-6 py-4 rounded-xl border border-white/10 text-sm font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-[2] btn-gold py-4 flex items-center justify-center gap-2"
              >
                Continue to Step {step + 1}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex-[2] btn-gold py-4 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    Submit Application
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
