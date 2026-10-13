import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tagde Nutrition | Premium Supplements for India",
  description:
    "Premium nutritional supplements for muscle building, general health and peak performance. Trusted by athletes and everyday Indians.",
  keywords: [
    "whey protein",
    "creatine",
    "supplements India",
    "Tagde Nutrition",
    "muscle building",
    "multivitamin",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
