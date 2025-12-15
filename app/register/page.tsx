/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { registerUser } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
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
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-semibold text-center mb-6">
      Register
    </h1>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        placeholder="Email"
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

      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="jobseeker">Job Seeker</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  </div>
</div>

  );
}
