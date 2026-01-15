"use client";

import { useRouter } from "next/navigation";

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="min-h-screen">
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
