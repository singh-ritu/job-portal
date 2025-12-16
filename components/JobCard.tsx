import Link from "next/link";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
        <h2 className="text-lg font-semibold">{job.title}</h2>

        <p className="text-sm text-gray-700 mt-1">
          {job.company}
        </p>

        <p className="text-sm text-gray-500">
          {job.location}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
            {job.jobType}
          </span>

          {job.salary && (
            <span className="text-xs text-gray-600">
              {job.salary}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
