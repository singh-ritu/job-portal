"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  createdAt: string;
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/my-jobs`,{
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.success)
      setJobs(data.jobs);
      console.log(jobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
       
        alert("Job deleted successfully");
        setJobs((prev) => prev.filter((job) => job._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  if (!jobs.length)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 text-lg">No jobs posted yet.</p>
        <Link
          href="/employer/dashboard/jobs/create"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create a Job
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">My Jobs</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-500">{job.company}</p>
              <p className="text-gray-400 text-sm">{job.location}</p>
              <p className="text-gray-400 text-xs mt-1">
                Posted on {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <Link
                href={`/employerDashboard/${job._id}`}
                className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
              >
                <FaEdit /> Edit
              </Link>
              <button
                onClick={() => handleDelete(job._id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
