import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Tentang Kami | AWS",
  description: "Pelajari sejarah, visi, misi, dan nilai-nilai PT AWS (AWS) dalam mengelola SDM profesional Indonesia.",
};

export default function Page() {
  return <AboutClient />;
}
