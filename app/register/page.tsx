"use client";

import { useState } from "react";
import { registerUser } from "../../lib/api";
import { useRouter } from "next/navigation";
import { USER_ENUMS } from "../enums/user.enums";
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, ArrowLeft } from "lucide-react"

export default function RegisterPage() {

  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: USER_ENUMS.JOB_SEEKER,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await registerUser(form);

    if (res.success) {
      alert("Registered successfully");
      router.push("/login");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 shadow-md bg-background">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#3456ad]" />
            <span className="text-xl font-semibold">JobPortal</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 bg-white">
        <Card className="w-full max-w-md border border-gray-200 shadow-md ">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Link href="/" className="text-(--muted-foreground) hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
            <CardDescription className="text-(--muted-foreground)">Register to Job-Portal to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>

              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="name"
                  placeholder="your name"
                  value={form.name}
                  required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
                />
              </div>


              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#3456ad] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  required
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
                />
              </div>

              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-2 text-(--muted-foreground) text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
              >
                <option value={USER_ENUMS.JOB_SEEKER}>Job Seeker</option>
                <option value={USER_ENUMS.EMPLOYER}>Recruiter</option>
              </select>


              <button
                type="submit"
                className="w-full rounded-md bg-[#3456ad] px-4 py-2.5 text-sm font-medium
               text-white
               hover:bg-primary/90
               focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
               transition"
              >
                Register
              </button>

            </form>
            {/* Footer */}
            <p className="mt-6 text-center text-sm text-(--muted-foreground)">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#3456ad] font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>

          </CardContent>
        </Card>
      </main>
    </div>

  );
}
