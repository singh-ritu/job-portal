"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Applicant } from "@/types/applicants";

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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Applicants</h1>

      <div className="space-y-4">
        {applicants.map((app) => (
          <div
            key={app._id}
            className="border rounded-lg p-4 flex justify-between items-center bg-white"
          >
            <div>
              <h3 className="font-medium">{app.applicant.name}</h3>
              <p className="text-sm text-gray-600">
                {app.applicant.email}
              </p>
              <p className="text-xs text-gray-500">
                Applied on {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-xs px-3 py-1 rounded ${
                  app.status === "Applied"
                    ? "bg-blue-100 text-blue-700"
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
                className="text-sm text-blue-600 hover:underline"
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
