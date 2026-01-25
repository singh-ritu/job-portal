"use client";

import { FaBookmark } from "react-icons/fa";

export default function SavedJobsPage() {

  const savedJobs: any[] = [];

  return (
    <div className="flex flex-col items-center justify-center h-full rounded-lg border-dashed border border-gray-500 shadow-md bg-white">
      {savedJobs.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl text-gray-300">
            <FaBookmark />
          </div>
          <h1 className="text-2xl font-semibold">
            No saved jobs yet
          </h1>
          <p className="text-(--muted-foreground) text-sm max-w-md">
            Any jobs you save will appear here. Browse jobs and click the "Save" button to keep track of opportunities you like.
          </p>
          <a
            href="/jobseekerDashboard"
            className="mt-4 inline-block bg-[#3456ad] text-white px-6 py-2 rounded-lg hover:bg-[#4663ac] transition"
          >
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <h2 className="font-semibold text-lg">{job.title}</h2>
              <p className="text-gray-500">{job.company}</p>
              <p className="text-gray-400 text-sm">{job.location}</p>
              <a
                href={`/jobs/${job.id}`}
                className="text-blue-600 mt-2 inline-block font-medium hover:underline"
              >
                View Job
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
