"use client";

import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

type ApplyPanelProps = {
  jobId: string;
  existingResumeUrl?: string | null;
  onSuccess: () => void;
  onClose?: () => void;
};

export default function ApplyPanel({
  jobId,
  existingResumeUrl,
  onSuccess,
}: ApplyPanelProps) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(
    existingResumeUrl || null
  );
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  /* ---------------- Resume Upload ---------------- */
  const handleResumeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      setError(null);
      setUploading(true);

      const res = await fetch(`${API_BASE_URL}/api/upload/resume`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Resume upload failed");
        }

        const data = await res.json();
        console.log("resumeUrl", data.resumeUrl);
        setResumeUrl(data.resumeUrl);
        console.log("resumeUrl", resumeUrl);

         return data.resumeUrl; 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- Apply Job ---------------- */
  const handleApply = async () => {
    if (!resumeUrl) return;

    try {
      setError(null);
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/api/applications/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeUrl }),
        credentials: "include",
      });

      console.log("Apply response:", res);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to apply");
      }
      setHasApplied(true);

      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border rounded-lg p-5 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Apply for this job</h3>

      {/* Error */}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* Existing Resume */}
      {existingResumeUrl && !resumeUrl && (
        <button
          onClick={() => setResumeUrl(existingResumeUrl)}
          className="mb-4 text-blue-600 underline"
        >
          Use existing resume
        </button>
      )}

      {/* Resume Upload */}
      {!resumeUrl && (
        <div className="mb-4">
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleResumeUpload(e.target.files[0]);
              }
            }}
          />
          {uploading && (
            <p className="text-sm mt-2 text-gray-600">Uploading resume...</p>
          )}
        </div>
      )}

      {/* Resume Ready */}
      {resumeUrl && (
        <p className="text-green-600 mb-4">✔ Resume ready</p>
      )}

      {/* Submit Button */}
      <button
        onClick={handleApply}
        disabled={!resumeUrl || submitting}
        className={`px-4 py-2 rounded text-white ${
          !resumeUrl || submitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </div>
  );
}
