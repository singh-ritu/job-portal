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
    <div className="border border-gray-200 shadow-md rounded-lg p-5 my-4">
      <div className="flex justify-between items-start cursor-pointer">
        <div>
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p className="text-sm text-(--muted-foreground)">
            {job.company} • {job.location}
          </p>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded ${job.isActive
            ? "text-white bg-[#36ad34]"
            : "text-white bg-[#a44242]"
            }`}
        >
          {job.isActive ? "Active" : "Closed"}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between cursor-pointer">
        <p className="text-sm text-(--muted-foreground)">
          Applicants:{" "}
          <span className="font-semibold text-[#3456ad]">{job.applicantsCount}</span>
        </p>

        <div className="flex gap-4 items-center">

          <Link
            href={`/employerDashboard/${job._id}/applicants`}
            className={`text-sm text-white font-medium border border-gray-200 shadow-sm px-2 py-1 rounded ${job.applicantsCount === 0
              ? "bg-[#607abe] pointer-events-none"
              : "bg-[#3456ad] hover:underline"
              }`}
          >
            View Applicants
          </Link>

          <Link
            href={`/employerDashboard/${job._id}/update`}
            className="text-sm font-medium text-[#3456ad] hover:underline rounded border border-gray-200 shadow-sm px-4 py-1"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="text-sm font-medium px-2 py-1 border border-gray-200 shadow-sm rounded text-[#a44242] hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
