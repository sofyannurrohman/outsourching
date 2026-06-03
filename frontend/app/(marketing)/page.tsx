import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "AWS SmartTalent | One System for All HR Needs",
  description: "Selamat datang di AWS SmartTalent. Kami membantu bisnis Anda tumbuh melalui pengelolaan talenta profesional, sistem HRIS yang inovatif, dan layanan managed services berkualitas sejak 2004.",
  keywords: ["outsourcing indonesia", "hr solutions", "manajemen sdm", "aws", "rekrutmen", "hris"],
};

export default function Page() {
  return <HomeClient />;
}
