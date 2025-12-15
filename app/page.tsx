"use client";

import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <button className="px-4 py-2 cursor-pointer" onClick={() => router.push("/login")}>Login</button>
          <button className="px-4 py-2 cursor-pointer" onClick={() => router.push("/register")}>Register</button>
          </div>
      </main>
      <Footer />
    </div>
  );
}
