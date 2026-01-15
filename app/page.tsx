"use client";

import { useRouter } from "next/navigation";

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen content-box">
      <Header />
      <main>
        <div className="min-h-screen">
          <HeroSection/>
          <SearchBar/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
