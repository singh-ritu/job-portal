"use client";

import { useRouter } from "next/navigation";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { StatsSection } from "@/components/StatsSection";
import { CTASection } from "@/components/CtaSection";
import { FeaturesSection } from "@/components/FeatureSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { FeaturedJobsSection } from "@/components/FeaturedJobSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen content-box">
      <Header />
      <main>
        <div className="min-h-screen">
          <HeroSection />
          <SearchBar />
          <StatsSection />

          <div id="about">
            <FeaturesSection />
          </div>

          <div id="companies">
            <CategoriesSection />
          </div>

          <div id="jobs">
            <FeaturedJobsSection />
          </div>

          <TestimonialsSection />
          <CTASection />
        </div>
      </main>
      <div id="contact">
        <Footer />s
      </div>
    </div>
  );
}
