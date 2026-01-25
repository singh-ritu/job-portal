"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Basic Info */}
      <div className="mb-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">Skills</label>

        <input
          type="text"
          placeholder="Type skill and press Enter"
          className="border px-3 py-2 w-full rounded"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              e.preventDefault();
              setSkills([...skills, e.currentTarget.value.trim()]);
              e.currentTarget.value = "";
            }
          }}
        />

        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() =>
                  setSkills(skills.filter((_, index) => index !== i))
                }
                className="text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Resume */}
      <div className="mb-6">
        <label className="font-semibold block mb-2">Resume</label>

        {resumeUrl ? (
          <div className="flex items-center gap-4">
            <a
              href={resumeUrl}
              target="_blank"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                e.target.files && handleResumeUpload(e.target.files[0])
              }
            />
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
          <p className="text-sm text-gray-500 mt-2">Uploading resume...</p>
        )}
      </div>


      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
