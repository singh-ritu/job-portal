export interface EmployerJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  salary: number;
  isActive: boolean;
  applicantsCount: number;
}