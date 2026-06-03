export type Role = "admin" | "talent" | "company";

export interface User {
  id: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export interface Talent {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  city?: string;
  province?: string;
  avatarUrl?: string;
  cvUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  summary?: string;
  currentJobTitle?: string;
  expectedSalary?: number;
  workType?: string;
  availability?: string;
  availableFrom?: string;
  skills: string[];
  experienceYears: number;
  internalScore: number;
  poolStatus: "pending" | "active" | "rejected";
  createdAt: string;
}

export interface Company {
  id: string;
  userId: string;
  email: string;
  companyName: string;
  industry?: string;
  companySize?: string;
  website?: string;
  logoUrl?: string;
  description?: string;
  address?: string;
  npwp?: string;
  subscriptionPlan: "free" | "basic" | "pro" | "enterprise";
  subscriptionExpiresAt?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  jobType: string;
  salaryMin?: number;
  salaryMax?: number;
  skillsRequired: string[];
  status: "draft" | "open" | "closed";
  deadline?: string;
  slots: number;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  talentId: string;
  coverLetter: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "accepted" | "hired";
  adminNote?: string;
  screeningQuestions?: Record<string, any>;
  testScore?: number;
  interviewNotes?: string;
  hrRating?: number;
  finalDecision?: string;
  reviewedAt?: string;
  createdAt: string;
  job?: Job;
  talent?: Talent;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
