"use client";

import { useState } from "react";
import ApplyPanel from "@/components/ApplyPanel";
import { USER_ENUMS } from "@/app/enums/user.enums";

export default function JobDetailsClient({
  job,
  user,
  alreadyApplied,
}: any) {
  const [showApplyPanel, setShowApplyPanel] = useState(false);
  const [applied, setApplied] = useState(alreadyApplied);

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-semibold">{job.title}</h1>
      <p className="text-(--muted-foreground)">{job.company}</p>
      <p className="mt-4 text-sm text-(--muted-foreground)">{job.description}</p>


      {user?.role === USER_ENUMS.JOB_SEEKER && (
        <>
          {!applied ? (
            <button
              onClick={() => setShowApplyPanel(true)}
              className="mt-6 px-4 py-2 bg-[#3456ad] text-white rounded hover:bg-[#506cb4] cursor-pointer"
            >
              Apply for this Job
            </button>
          ) : (
            <button
              disabled
              className="mt-6 px-4 py-2 bg-(--muted-foreground) text-white rounded"
            >
              Applied ✔
            </button>
          )}
        </>
      )}

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
