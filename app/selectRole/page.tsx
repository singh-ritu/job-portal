"use client";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function SelectRole() {

  const router = useRouter()

  const chooseRole = async (role: "employer" | "jobseeker") => {

    const res = await fetch(`${API_BASE_URL}/api/auth/setRole`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) {
      throw new Error("Failed to set Role")
    }
    const data = await res.json()

    console.log("response:", data)

    if (data.role === "jobseeker") {
      console.log("redirect to jobseeker")
      redirect(data.redirectTo)
    } else if (data.role === "employer") {
      redirect(data.redirectTo)
    }

  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 shadow-md bg-background">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <User className="h-6 w-6 text-[#3456ad]" />
            <span className="text-xl font-semibold">Select Role</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 bg-white">
        <Card className="w-full max-w-md border border-gray-200 shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-bold">Select Your Role</CardTitle>
            <CardDescription className="text-(--muted-foreground)">Choose your role to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <button
                onClick={() => chooseRole("employer")}
                className="w-full rounded-md bg-[white] px-4 py-2.5 text-sm font-semibold
               text-(--muted-foreground) border-[#3456ad] border
               hover:bg-[#3456ad]/90 hover:text-white cursor-pointer
               focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
               transition"
              >
                Employer
              </button>
              <button onClick={() => chooseRole("jobseeker")} className="w-full rounded-md bg-[white] px-4 py-2.5 text-sm font-semibold
              text-(--muted-foreground) border-[#3456ad] border
               hover:bg-[#3456ad]/90  hover:text-white cursor-pointer
               focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
               transition">
                Job Seeker
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
