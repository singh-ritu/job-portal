"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";


export default function CreateJobPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    company: "",
    jobType: "",
    salary: "",
    experienceLevel: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form, [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          salary: Number(form.salary), // ensure number
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Job creation failed");
      }

      router.push("/employerDashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full border items-center border-gray-200  shadow-md p-4 rounded-md bg-white">
        <div className="flex items-center gap-3">
          <User className="h-6 w-6 text-[#3456ad]" />
          <span className="font-semibold">Post a New Job</span>
        </div>
      </div>

      <div className="container mx-auto mt-8 rounded-lg border border-gray-200 shadow-md p-8 bg-white">

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="text-sm font-semibold">
              Job Title
            </label>
            <input
              name="title"
              value={form.title}
              placeholder="e.g. Frontend Developer, Software Engineer"
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="company"
              className="text-sm font-semibold">
              Company
            </label>
            <input
              name="company"
              value={form.company}
              placeholder="e.g. TechNova Solutions Pvt. Ltd."
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="location"
              className="text-sm font-semibold">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              placeholder="e.g. Bangalore, India / Remote"
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
              required
            />
          </div>

          <div className="flex items-center gap-10">
            <div>
              <label
                htmlFor="jobType"
                className="block text-sm font-semibold">
                Job Type
              </label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="text-sm font-medium px-4 py-2 rounded bg-[#3456ad] hover:bg-[#5779ce] text-white transition-colors cursor-pointer"
              >
                <option value="">select option</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Freelance</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-semibold">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={handleChange}
                className="text-sm font-medium px-4 py-2 rounded bg-[#3456ad] hover:bg-[#5779ce] text-white transition-colors cursor-pointer"
              >
                <option value="">select option</option>
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>

              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="salary"
              className="text-sm font-semibold">
              Salary (Annual)
            </label>
            <input
              name="title"
              value={form.salary}
              placeholder="Enter annual salary"
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="text-sm font-semibold">
              Job Description
            </label>
            <textarea
              name="description"
              placeholder="Write a detailed job description, required skills, and qualifications"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
            />
            <label className="text-sm font-medium text-(--muted-foreground)">
              Job is active
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#3456ad] text-white px-6 py-2 rounded hover:bg-[#5671b4] disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>

        </form>
      </div>
    </div>
  );
}