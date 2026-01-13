"use client"; // Client component if we plan to fetch later

import { FaBookmark } from "react-icons/fa";

export default function SavedJobsPage() {
  // For now, no jobs saved
  const savedJobs: any[] = []; // Replace with API data when available

  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20">
      {savedJobs.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl text-gray-300">
            <FaBookmark />
          </div>
          <h1 className="text-2xl font-semibold text-gray-700">
            No saved jobs yet
          </h1>
          <p className="text-gray-500 max-w-md">
            Any jobs you save will appear here. Browse jobs and click the "Save" button to keep track of opportunities you like.
          </p>
          <a
            href="/jobseekerDashboard"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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
