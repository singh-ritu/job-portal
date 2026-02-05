"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `/api/auth/reset-Password/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Password reset successful");
      router.push("/login");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 shadow-md bg-background">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#3456ad]" />
            <span className="text-xl font-semibold">Reset Password</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 bg-white">
        <Card className="w-full max-w-md border border-gray-200 shadow-md ">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription className="text-muted-foreground">Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="sapce-y-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
                />
              </div>
              <button
                disabled={loading}
                className="w-full rounded-md bg-[#3456ad] px-4 py-2.5 text-sm font-medium
               text-white
               hover:bg-primary/90
               focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
               transition"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div >
  );
}
