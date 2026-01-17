"use client";
import type { Metadata } from "next"
import Link from "next/link"
import { Briefcase, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loginUser } from "@/lib/api"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { USER_ENUMS } from "../enums/user.enums";

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: any) => {

    e.preventDefault();
    const res = await loginUser(form)

    console.log("login response:", res)
    if (!res.success) {
      alert(res.message)
    }
    console.log("response:", res)

    if (res.user.role === USER_ENUMS.JOB_SEEKER) {
      router.push("/jobseekerDashboard")
    } else if (res.user.role === USER_ENUMS.EMPLOYER) {
      router.push("/employerDashboard")
    } else (
      router.push("/")
    )
  }

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
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription className="text-(--muted-foreground)">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>


              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
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
                  required
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
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
                Sign In
              </button>
            </form>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 my-6">
              <span className="h-px border border-gray-200" />
              <span className="text-xs uppercase text-muted-foreground bg-background px-2">
                Or continue with
              </span>
              <span className="h-px border border-gray-200" />
            </div>


            {/* <div className="grid grid-cols-2 gap-3">
              <button
                className="flex items-center justify-center gap-2 rounded-md border border-gray-200
               bg-background px-3 py-2 text-sm font-medium
               hover:bg-accent transition"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>

              <button
                className="flex items-center justify-center gap-2 rounded-md border border-gray-200
               bg-background px-3 py-2 text-sm font-medium
               hover:bg-accent transition"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387..." />
                </svg>
                GitHub
              </button>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-(--muted-foreground)">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-[#3456ad] font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>

          </CardContent>
        </Card>
      </main>
    </div>
  )
}
