"use client";
import {useEffect, useState} from "react";
import { Job } from "@/types/job";
import { getPublicJobs } from "@/lib/api";
import JobCard from "@/components/JobCard";
import { getLoggedInUserAppliedJobsServer} from "@/lib/api";


export default function jobsDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
     setPage(1);
  }, [keyword, location, jobType]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      console.log({ keyword, location, jobType, page });
      const data = await getPublicJobs({ page, limit: 10, keyword, location, jobType });
      const appliedJobs = await getLoggedInUserAppliedJobsServer();
      console.log("appliedJobs", appliedJobs);

      setJobs(data.jobs);
      setAppliedJobs(appliedJobs);
      setTotalPages(data.totalPages);

    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    const timeout = setTimeout(() => {
      fetchJobs()
    },3000)
    return () => clearTimeout(timeout);
  },[keyword, page, location, jobType]);

   

    return (
     <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

      <div className="p-8">
        <input
        type="text"
        placeholder="Search jobs"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border px-8 py-2 rounded-md mr-4"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
         className="border px-8 py-2 rounded-md mr-4"
      />

      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="px-8 py-2 rounded-md"
      >
        <option value="">All Types</option>
        <option value="Full-time">Full Time</option>
        <option value="Part-time">Part Time</option>
        <option value="Internship">Internship</option>
        <option value="Contract">Contract</option>
      </select>
      </div>

      
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} appliedJobIds={appliedJobs}/>
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