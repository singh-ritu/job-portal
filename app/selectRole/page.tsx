"use client";
import { redirect, useRouter } from "next/navigation";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function SelectRole() {

  const router = useRouter()

  const chooseRole = async (role: "employer" | "jobseeker") => {

    const res = await fetch(`${API_BASE_URL}/api/auth/setRole`, {
      method: "POST",
      credentials: "include", // 🔑 cookie required
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
    <div>
      <h1>Select your role</h1>

      <button onClick={() => chooseRole("employer")}>
        Employer
      </button>

      <button onClick={() => chooseRole("jobseeker")}>
        Job Seeker
      </button>
    </div>
  );
}
