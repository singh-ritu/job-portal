/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await loginUser(form);

    if (!res.success) {
      alert(res.message);
    }
   
    if (res.user.role === "jobseeker") {
      router.push("/jobseekerDashboard");
    } else if (res.user.role === "employer") {
      router.push("/employerDashboard");
    } else {
      router.push("/");
    }
    };
    return(
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-6">
                 Login
             </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-900 transition"
      >
        Login
      </button>
    </form>
  </div>
</div>
    )
}