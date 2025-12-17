"use client";
import { use, useEffect, useState } from "react";
import { Job } from "@/types/job";
import { getPublicJobs } from "@/lib/api";
import JobCard from "@/components/JobCard";


export default function jobsDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getPublicJobs({ page, limit: 10 });

      setJobs(data.jobs);
      setTotalPages(data.totalPages);

    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchJobs();
  },[page])

    return (
     <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
      
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}

               <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
           className="bg-blue-600 px-8 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-blue-600 px-8 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
    );
}