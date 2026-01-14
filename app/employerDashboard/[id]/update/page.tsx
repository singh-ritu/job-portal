"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch existing job
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
          credentials: "include",
        });
        const data = await res.json();

        setForm({
          title: data.job.title,
          company: data.job.company,
          location: data.job.location,
          description: data.job.description,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // 2️⃣ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3️⃣ Submit updated job
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      router.push("/employerDashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update job");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">
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

            <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">
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

            <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">
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

            <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">
                Job Description
                </label>
                <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full border rounded px-3 py-2"
                required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                Update Job
             </button>
        </form> 
    </div>
  );
}
