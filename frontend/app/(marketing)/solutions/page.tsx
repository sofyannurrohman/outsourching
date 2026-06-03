import { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Solusi Kami | AWS",
  description: "Temukan solusi SDM komprehensif mulai dari Managed Services, Recruitment, hingga sistem HRIS inovatif dari AWS.",
};

export default function Page() {
  return <SolutionsClient />;
}
