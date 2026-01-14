import Link from "next/link";
import { EmployerJob } from "../types/employerJob";

interface JobCardProps {
  job: EmployerJob;
  onDelete: (jobId: string) => void;
}

export default function JobCard({ job, onDelete }: JobCardProps) {
  const handleDelete = () => {
    const confirmed = confirm(
      `Are you sure you want to delete "${job.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    onDelete(job._id);
  };

  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p className="text-sm text-gray-600">
            {job.company} • {job.location}
          </p>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded ${
            job.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {job.isActive ? "Active" : "Closed"}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Applicants:{" "}
          <span className="font-semibold">{job.applicantsCount}</span>
        </p>

        <div className="flex gap-4 items-center">
         
          <Link
            href={`/employerDashboard/${job._id}/applicants`}
            className={`text-sm font-medium ${
              job.applicantsCount === 0
                ? "text-gray-400 pointer-events-none"
                : "text-blue-600 hover:underline"
            }`}
          >
            View Applicants
          </Link>

          <Link
            href={`/employerDashboard/${job._id}/update`}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
