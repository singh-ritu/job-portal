/* eslint-disable @typescript-eslint/no-explicit-any */
import {Job} from "@/types/job";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined");
}

interface GetJobsParams{
  page?: number;
  limit?: number;
  keyword?: string;
  location?: string;
  jobType?: string;
}

// FETCH JOBS WITH FILTERS AND PAGINATION
export async function getPublicJobs(params: GetJobsParams) {

  const {
    page = 1,
    limit = 10,
    keyword,
    location,
    jobType,
  } = params;

  const query = new URLSearchParams();
  
  query.append("page", page.toString());
  query.append("limit", limit.toString());

  if (keyword) query.append("keyword", keyword);
  if (location) query.append("location", location);
  if (jobType) query.append("jobType", jobType);

  const res = await fetch(`${API_BASE_URL}/api/jobs?${query.toString()}`)

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return res.json();
}


// REGISTER USER
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const res = await fetch("/api/register", 
    {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Register failed");
  }

  return res.json();
}

// LOGIN USER
export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const res = await fetch("/api/login", 
    {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  const text = await res.text();
  let result;

  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}

