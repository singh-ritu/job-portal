import { getJobDetails } from "@/lib/api";
import { getLoggedInUserServer, getLoggedInUserApplicationsServer } from "@/lib/api.server"
import Link from "next/link";
import JobDetailsClient from "./jobDetailsclient"


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailsPage({ params }: Props) {

  const { id } = await params;
  const data = await getJobDetails(id);
  const user = await getLoggedInUserServer();
  const applications = await getLoggedInUserApplicationsServer()


  if (!data?.job) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        Job not found
      </div>
    );
  }

  const job = data.job;
  console.log("applications", applications);
  const alreadyApplied = applications.some(
    (app: any) => app.job._id.toString() === job._id.toString()
  );

  return (
    <div className="min-h-screen mt-8 flex flex-col">

      <Link
        href="/jobseekerDashboard"
        className="mb-6 inline-block text-sm font-medium hover:text-(--mute-foreground) text-[#3456ad] hover:underline"
      >
        ← Back to jobs
      </Link>


      <div className="rounded-lg bg-white p-8 border border-gray-200 shadow-md">

        <h1 className="text-2xl font-semibold mb-3">
          {job.title}
        </h1>


        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
          <span>
            <strong className="text-gray-800">Company:</strong>{" "}
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {job.company}
            </span>
          </span>
          <span>
            <strong className="text-gray-800">Location:</strong>{" "}
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {job.location}
            </span>
          </span>
          <span>
            <strong className="text-gray-800">Type:</strong>{" "}
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {job.jobType}
            </span>
          </span>
        </div>


        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Job Description
          </h3>
          <span className="text-(--muted-foreground) text-sm leading-relaxed">
            {job.description}
          </span>
        </div>
        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 border-t border-gray-200 pt-6">
          <span className="text-sm text-(--muted-foreground)">
            Posted on{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
          {
            job.isActive ? (
              <JobDetailsClient job={job} user={user} applications={applications} alreadyApplied={alreadyApplied} />
            ) : (
              <span className="text-[#a44242] font-semibold">
                This job posting is no longer active.
              </span>
            )
          }
        </div>
      </div>
    </div>
  );
}