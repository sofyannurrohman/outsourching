import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Hubungi Kami | AWS",
  description: "Terhubung dengan tim AWS untuk konsultasi solusi SDM, rekrutmen, dan kemitraan strategis di seluruh Indonesia.",
};

export default function Page() {
  return <ContactClient />;
}
