import { getLoggedInUserApplicationsServer } from "@/lib/api.server";

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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      <div className="space-y-4">
        {applications.map((app: any) => (
          <div
            key={app._id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">
                  {app.job.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {app.job.company} · {app.job.location}
                </p>
              </div>

              <span className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700">
                {app.status}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm text-gray-500">
              <span>
                Applied on{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </span>

              <a
                href={app.resumeUrl}
                target="_blank"
                className="text-blue-600 hover:underline"
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
