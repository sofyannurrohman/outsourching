import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "AWS SmartTalent | One System for All HR Needs",
  description: "AWS SmartTalent menyediakan solusi pengelolaan sumber daya manusia yang inovatif, profesional, dan bernilai tambah bagi bisnis Anda sejak 2004.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-inter antialiased`}>
        <div className="flex min-h-screen flex-col bg-background text-foreground transition-all duration-300">
          <Toaster 
            position="top-right" 
            toastOptions={{
              className: "bg-black text-white border border-[#D4AF37]/50",
              duration: 3000,
            }}
          />
          {children}
        </div>
      </body>
    </html>
  );
}
