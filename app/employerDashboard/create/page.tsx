"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";


export default function CreateJobPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    company: "",
    jobType: "Full-time",
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
    <div className="max-w-3xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Job Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Job Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Company
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Job Type
          </label>
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
            <option>Freelance</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Experience Level
          </label>
          <select
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select level</option>
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Salary (Annual)
          </label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Job Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
                }
          />
          <label className="text-sm font-medium text-gray-700">
            Job is active
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

      </form>
    </div>
  );
}