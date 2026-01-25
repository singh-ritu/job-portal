import Link from "next/link";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  appliedJobIds?: string[];
}

export default function JobCard({ job, appliedJobIds }: JobCardProps) {
  return (

    <div className="w-full max-w-md border rounded-2xl p-6 border-gray-200 shadow-md">

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

      <Link href={`/jobseekerDashboard/${job._id}`}>
        {appliedJobIds?.includes(job._id) ? (
          <button disabled className="mt-6 px-4 py-2 bg-gray-400 text-white rounded">Already Applied</button>
        ) : (
          <button className="mt-4 bg-[#3456ad] text-white px-4 py-2 rounded-md hover:bg-[#5671b4] transition">view Details</button>
        )}
      </Link>

    </div>


  );
}
