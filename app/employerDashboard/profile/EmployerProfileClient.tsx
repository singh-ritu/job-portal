"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, UserCircle } from "lucide-react";

export default function EmployerProfileClient({ user }: any) {

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const router = useRouter()
  const [profile, setProfile] = useState({
    companyName: "",
    experienceLevel: "",
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
    <div className="min-h-screen flex flex-col">

      <div className="w-full border items-center border-gray-200 shadow-md p-4 rounded-md bg-white">
        <div className="flex items-center gap-3">
          <UserCircle className="h-6 w-6 text-[#3456ad]" />
          <span className="font-semibold">Keep Your Profile Updated</span>
        </div>
      </div>

      <div className="container mx-auto w-1/2 p-8 rounded-xl border mt-8 border-gray-200 shadow-md bg-white">

        <div className="mb-6 flex flex-col cursor-pointer">
          <span className="text-2xl font-bold text-[#3456ad]">{user.name}</span>
          <span className="text-sm flex items-center font-semibold text-(--muted-foreground) hover:text-gray-500 hover:underline">
            <Mail size={16} />
            {user.email}</span>
        </div>

        <div className="space-y-5 bg-white p-6 rounded-lg border border-gray-200 shadow-md">

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={profile.companyName}
              placeholder="e.g. TechNova Solutions Pvt. Ltd."
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 shadow-sm bg-background px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Hiring Level
            </label>
            <select
              name="experienceLevel"
              value={profile.experienceLevel}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 shadow-sm bg-background px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
            >
              <option value="">Select Option</option>
              <option>Entry</option>
              <option>Mid</option>
              <option>Senior</option>
              <option>Director</option>
              <option>Executive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              About Company
            </label>
            <textarea
              name="aboutCompany"
              value={profile.aboutCompany || ""}
              placeholder="Write a description about a company"
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#3456ad]"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#3456ad] text-white px-5 py-2 rounded hover:bg-[#5671b4] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

