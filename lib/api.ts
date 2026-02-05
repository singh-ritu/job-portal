
interface GetJobsParams {
  page?: number;
  limit?: number;
  keyword?: string;
  location?: string;
  jobType?: string;
}

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

  const res = await fetch(`/api/jobs?${query.toString()}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return res.json();
}


export async function getLoggedInUserAppliedJobsServer() {
  const res = await fetch(`/api/applications/my`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user applications");
  }
  const applications = await res.json();

  const appliedJobIds = applications.map((app: any) => app.job._id.toString());
  return appliedJobIds;
}


export async function getJobDetails(id: string) {
  const url = `/api/jobs/${id}`;
  console.log("FETCHING:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch job details");
  return res.json();
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const res = await fetch(`/api/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Register failed");
  }

  return res.json();
}


export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`/api/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
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

