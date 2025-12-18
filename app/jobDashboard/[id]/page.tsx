import { getJobDetails } from "@/lib/api";
import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailsPage({ params }: Props) {
  const { id } = await params;
  const data = await getJobDetails(id);

  if (!data?.job) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        Job not found
      </div>
    );
  }

  const job = data.job;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/jobDashboard"
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Back to jobs
      </Link>

      {/* Card */}
      <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          {job.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
          <span>
            <strong className="text-gray-800">Company:</strong>{" "}
            {job.postedBy?.name}
          </span>
          <span>
            <strong className="text-gray-800">Location:</strong>{" "}
            {job.location}
          </span>
          <span>
            <strong className="text-gray-800">Type:</strong>{" "}
            {job.jobType}
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {job.description}
          </p>
        </div>
        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-6">
          <span className="text-sm text-gray-500">
            Posted on{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </span>

          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
