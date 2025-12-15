import type { Metadata } from "next";
import { Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
  preload: true,
});

export const metadata: Metadata = {
  title: "Wanderly - Discover Your Taiwan",
  description: "Experience the unheard stories of the island.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${notoSerifTC.className} antialiased min-h-screen flex flex-col bg-[#FFF9F2]`}
      >
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
