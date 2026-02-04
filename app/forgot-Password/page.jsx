"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-Password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    alert("Reset link sent to email");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 shadow-md bg-background">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#3456ad]" />
            <span className="text-xl font-semibold">Forgot Password</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 bg-white">
        <Card className="w-full max-w-md border border-gray-200 shadow-md ">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            <CardDescription className="text-(--muted-foreground)">Enter your email to receive a password reset link</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={submit}>
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
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#3456ad] px-4 py-2.5 text-sm font-medium
               text-white
               hover:bg-primary/90
               focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
               transition"
              >
                Send Reset Link
              </button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div >
  );
}
