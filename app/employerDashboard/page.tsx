"use client";

import { useEffect, useState } from "react";
import JobCard from "../../components/EmployerJobCard";
import { EmployerJob } from "@/types/employerJob";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function EmployerDashboardPage() {
  const [jobs, setJobs] = useState<EmployerJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/jobs/my-jobs`,
          {
            method: "GET",
            credentials: "include", 
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        setJobs(data.jobs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        alert("Failed to delete job");
        return;
      }

      // Optimistic UI update
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Jobs</h1>

      {jobs.length === 0 ? (
  <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 text-center">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">
      You haven’t posted any jobs yet
    </h2>

    <p className="text-gray-500 mb-6 max-w-md">
      Start attracting candidates by creating your first job posting.
      It only takes a few minutes to go live.
    </p>

    <Link
      href="/employerDashboard/create"
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition"
    >
      + Create Job
    </Link>
  </div>
) : (
  jobs.map((job) => (
    <JobCard
      key={job._id}
      job={job}
      onDelete={handleDeleteJob}
    />
  ))
)}

    </div>
  );
}
