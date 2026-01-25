"use client";
import { useEffect, useState } from "react";
import { Job } from "@/types/job";
import { getPublicJobs } from "@/lib/api";
import JobCard from "@/components/JobCard";
import { getLoggedInUserAppliedJobsServer } from "@/lib/api";
import { Search, MapPin, LayoutDashboardIcon } from "lucide-react";



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
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchJobs()
    }, 3000)
    return () => clearTimeout(timeout);
  }, [keyword, page, location, jobType]);



  return (
    <div className="min-h-screen flex flex-col">

      <div className="w-full border items-center border-gray-200 shadow-md p-4 rounded-md bg-white">
        <div className="flex items-center gap-3">
          <LayoutDashboardIcon className="h-6 w-6 text-[#3456ad]" />
          <span className="font-semibold">Find Your Next Career Opportunity</span>
        </div>
      </div>

      <section className="relative my-8 z-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl bg-card rounded-lg shadow-md border border-gray-200 p-6 bg-white">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-2 border border-gray-200 shadow-md rounded-md px-4 py-2">
                <Search className="h-5 w-5 text-(--muted-foreground)" />
                <input
                  type="text"
                  placeholder="search jobs ..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 border border-gray-200 shadow-md rounded-md px-4 py-2">
                <MapPin className="h-5 w-5 text-(--muted-foreground)" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="text-sm font-medium px-4 py-2 rounded bg-[#3456ad] hover:bg-[#5779ce] text-white transition-colors cursor-pointer">
                <option value="">All Types</option>
                <option value="Full-time">Full Time</option>
                <option value="Part-time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>
      </section>


      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} appliedJobIds={appliedJobs} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-[#3456ad] px-8 text-white py-2 rounded-md font-semibold hover:bg-[#5671b4] transition"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-[#3456ad] px-8 text-white py-2 rounded-md font-semibold hover:bg-[#5671b4]   transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}