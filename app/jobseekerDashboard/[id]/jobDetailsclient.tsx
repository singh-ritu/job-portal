"use client";

import { useState } from "react";
import ApplyPanel from "@/components/ApplyPanel";

export default function JobDetailsClient({
  job,
  user,
  alreadyApplied,
}: any) {
  const [showApplyPanel, setShowApplyPanel] = useState(false);
  const [applied, setApplied] = useState(alreadyApplied);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Job Info */}
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.companyName}</p>
      <p className="mt-4">{job.description}</p>

      {/* Apply Section */}
      {user?.user.role === "jobseeker" && (
        <>
          {!applied ? (
            <button
              onClick={() => setShowApplyPanel(true)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Apply for this Job
            </button>
          ) : (
            <button
              disabled
              className="mt-6 px-4 py-2 bg-gray-400 text-white rounded"
            >
              Applied ✔
            </button>
          )}
        </>
      )}

      {/* Apply Panel */}
      {showApplyPanel && !applied && (
        <ApplyPanel
          jobId={job._id}
          existingResumeUrl={user?.resumeUrl}
          onSuccess={() => {
            setApplied(true);
            setShowApplyPanel(false);
          }}
        />
      )}
    </div>
  );
}
