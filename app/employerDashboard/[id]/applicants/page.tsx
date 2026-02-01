"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Applicant } from "@/types/applicants";
import { Mail, Users } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function ApplicantsPage() {
  const { id } = useParams();
  console.log("jobId:", id);

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await fetch(
        `${API_BASE_URL}/api/applications/${id}/applicants`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      setApplicants(data.applicants);
      setLoading(false);
      console.log("Fetched applicants:", applicants)
    };

    fetchApplicants();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading applicants...</p>;
  }

  if (applicants.length === 0) {
    return <p className="p-6">No applicants yet.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">

      <div className="w-full border items-center border-gray-200 shadow-md p-4 rounded-md bg-white">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-[#3456ad]" />
          <span className="font-semibold">Review candidates for this position</span>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        {applicants.map((app) => (
          <div
            key={app._id}
            className="border border-gray-200 shadow-md rounded-lg p-4 flex justify-between items-center bg-white cursor-pointer"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#3456ad]">{app.applicant.name}</h3>
              <p className="text-sm flex items-center font-semibold justify-center text-(--muted-foreground) hover:text-gray-600 hover:underline">
                <Mail size={14} />
                {app.applicant.email}
              </p>
              <p className="text-xs font-medium text-gray-500">
                Applied on {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-medium px-3 py-1 rounded ${app.status === "Applied"
                  ? "bg-[#4a64a6] hover:bg-[#3456ad] text-white"
                  : app.status === "Shortlisted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {app.status}
              </span>

              <a
                href={app.resumeUrl}
                target="_blank"
                className="text-sm font-medium text-[#3456ad] hover:underline"
              >
                View Resume
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
