"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Building2, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

const registerSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterCompanyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/register/company", {
        companyName: data.companyName,
        email: data.email,
        password: data.password,
      });
      
      const { token, role, user_id } = res.data.data;
      setAuth(token, role, user_id);
      
      toast.success("Welcome aboard! Let's build your team.");
      router.push("/dashboard/company");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Registration failed.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-outfit font-bold mb-2">Hire with Hub</h1>
        <p className="text-sm text-white/50">Register your company to access global talent</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-white/40">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                {...register("companyName")}
                type="text"
                placeholder="Acme Inc."
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                autoComplete="organization"
              />
            </div>
            {errors.companyName && <p className="text-xs text-red-400 mt-1">{errors.companyName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-white/40">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                {...register("email")}
                type="email"
                placeholder="hr@acme.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-white/40">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                autoComplete="new-password"
              />
            </div>
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-white/40">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                autoComplete="new-password"
              />
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full btn-gold py-3 flex items-center justify-center gap-2 group mt-4"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Register Business
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm text-white/40">
          Already have an account?{" "}
          <Link href="/login" className="text-[#D4AF37] font-semibold hover:underline">
            Sign In
          </Link>
        </p>
        <p className="text-sm text-white/40 mt-2">
          Are you a candidate?{" "}
          <Link href="/register/talent" className="text-white/60 hover:text-white transition-colors underline">
            Register Talent
          </Link>
        </p>
      </div>
    </div>
  );
}
