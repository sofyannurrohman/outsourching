"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterTalentPage() {
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
      const res = await api.post("/auth/register/talent", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      
      const { token, role, user_id } = res.data.data;
      setAuth(token, role, user_id);
      
      toast.success("Welcome to the Pool!");
      router.push("/dashboard/talent");
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
        <h1 className="text-2xl font-outfit font-bold mb-2">Join as Talent</h1>
        <p className="text-sm text-white/50">Create your elite profile and get placed</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-white/40">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                {...register("fullName")}
                type="text"
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-white/40">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
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
              Register Now
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
          Are you a company?{" "}
          <Link href="/register/company" className="text-white/60 hover:text-white transition-colors underline">
            Register Business
          </Link>
        </p>
      </div>
    </div>
  );
}
