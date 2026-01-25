"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, Mail } from "lucide-react";

export default function ProfileClient({ user }: any) {
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [resumeUrl, setResumeUrl] = useState<string | null>(user.resumeUrl);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/jobseekers/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, resumeUrl }),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update profile");
      }

      alert("Profile updated successfully");
      router.push("/jobseekerDashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };


  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/upload/resume`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Resume upload failed");
      }

      const data = await res.json();
      setResumeUrl(data.resumeUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">

      <div className="w-full border items-center border-gray-200  shadow-md p-4 rounded-md bg-white">
        <div className="flex items-center gap-3">
          <UserCircle className="h-6 w-6 text-[#3456ad]" />
          <span className="font-semibold">Keep Your Profile Update</span>
        </div>
      </div>

      <div className="container mx-auto w-1/2 p-8 rounded-xl border mt-8 border-gray-200 shadow-md bg-white">

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="mb-6 flex flex-col cursor-pointer">
          <span className="text-2xl font-bold text-[#3456ad]">{user.name}</span>
          <span className="text-sm flex items-center font-semibold text-(--muted-foreground) hover:text-gray-500 hover:underline">
            <Mail size={16} />
            {user.email}</span>
        </div>

        <div className="space-y-5 bg-white p-6 rounded-lg border border-gray-200 shadow-md">

          <div className="space-y-1.5">
            <label
              htmlFor="skills"
              className="text-sm font-semibold"
            >
              Skills
            </label>
            <input
              type="text"
              placeholder="Type skill and press Enter"
              className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  e.preventDefault();
                  setSkills([...skills, e.currentTarget.value.trim()]);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>


          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-[#4d68ae] text-white px-3 py-1 rounded flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() =>
                    setSkills(skills.filter((_, index) => index !== i))
                  }
                  className="text-white"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="mb-6">
            <label className="font-semibold text-sm block">Resume</label>

            {resumeUrl ? (
              <div className="flex items-center gap-4">
                <a
                  href={resumeUrl}
                  target="_blank"
                  className="text-[#556fb0] hover:text-[#3456ad] underline"
                >
                  View Resume
                </a>
              </div>
            ) : (
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  e.target.files && handleResumeUpload(e.target.files[0])
                }
              />
            )}

            {uploading && (
              <p className="text-sm text-(--muted-foreground) mt-2">Uploading resume...</p>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#3456ad] text-white px-6 py-2 rounded hover:bg-[#556fb0] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>

  );
}
