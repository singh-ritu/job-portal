"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployerProfileClient({ user }: any) {

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const router = useRouter()
  const [profile, setProfile] = useState({
    companyName: "",
    experienceLevel: "Mid",
    aboutCompany: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        companyName: user.companyName || "",
        experienceLevel: user.experienceLevel || "Mid",
        aboutCompany: user.aboutCompany || "",
      });
      setLoading(false)
    }
  }, [user])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);

    const res = await fetch(`${API_BASE_URL}/api/employers/profile`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
      }
    );
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update profile")
    }
    alert("Profile updated");
    router.push("/employerDashboard")
    setSaving(false);
  };

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">
        Employer Profile
      </h1>
      <div className="mb-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="space-y-5 bg-white p-6 rounded-lg border">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={profile.companyName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Hiring Level
          </label>
          <select
            name="experienceLevel"
            value={profile.experienceLevel}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Entry">Entry</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Director">Director</option>
            <option value="Executive">Executive</option>
          </select>
        </div>

        {/* About Company */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            About Company
          </label>
          <textarea
            name="aboutCompany"
            value={profile.aboutCompany || ""}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}

