import { getLoggedInUserApplicationsServer } from "@/lib/api.server";
import { ClipboardList } from "lucide-react";

export default async function MyApplicationsPage() {
  const applications = await getLoggedInUserApplicationsServer();

  if (!applications.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        You have not applied to any jobs yet.
      </p>
    );
  }

  return (
    <div className="min-h-screen mt-2 flex flex-col">

      <div className="w-full border items-center border-gray-200 shadow-md p-4 rounded-md bg-white">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-[#3456ad]" />
          <span className="font-semibold">List of My Applications</span>
        </div>
      </div>

      <div className="space-y-4 mt-4">
        {applications.map((app: any) => (
          <div
            key={app._id}
            className="p-4 bg-white border rounded-lg border-gray-200 shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">
                  {app.job.title}
                </h2>
                <p className="text-sm text-(--muted-foreground)">
                  {app.job.company} · {app.job.location}
                </p>
              </div>

              <span className="px-3 py-1 text-sm rounded bg-[#3456ad] text-white">
                {app.status}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm text-(--muted-foreground)">
              <span>
                Applied on{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </span>

              <a
                href={app.resumeUrl}
                target="_blank"
                className="text-[#3456ad] hover:underline"
              >
                View Resume
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
