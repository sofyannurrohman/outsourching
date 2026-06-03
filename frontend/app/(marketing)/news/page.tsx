import { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "Berita & Galeri | AWS",
  description: "Dapatkan informasi terbaru mengenai prestasi, inovasi, dan kegiatan korporat PT AWS.",
};

export default function Page() {
  return <NewsClient />;
}
