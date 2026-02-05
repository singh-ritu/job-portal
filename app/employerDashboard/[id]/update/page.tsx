"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Edit } from "lucide-react";


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
        const res = await fetch(`/api/jobs/${id}`, {
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
      const res = await fetch(`/api/jobs/${id}`, {
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
    <div className="min-h-screen flex flex-col">

      <div className="w-full border items-center border-gray-200 shadow-md p-4 rounded-md bg-white">
        <div className="flex items-center gap-3">
          <Edit className="h-6 w-6 text-[#3456ad]" />
          <span className="font-semibold">Keep your job listing accurate and up to date</span>
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
          <button
            type="submit"
            className="bg-[#3456ad] text-white px-4 py-2 rounded hover:bg-[#5671b4]"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}
