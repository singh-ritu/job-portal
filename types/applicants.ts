export interface Applicant {
  _id: string;
  status: "Applied" | "Shortlisted" | "Rejected";
  resumeUrl: string;
  createdAt: string;
  applicant: {
    _id: string;
    name: string;
    email: string;
  };
}
