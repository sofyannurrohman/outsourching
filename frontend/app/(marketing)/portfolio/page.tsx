import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portofolio Kami | AWS",
  description: "Melihat rekam jejak keberhasilan AWS dalam melayani ratusan mitra korporat di berbagai industri nasional.",
};

export default function Page() {
  return <PortfolioClient />;
}
