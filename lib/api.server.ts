import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function getLoggedInUserServer() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  console.log("SERVER COOKIE HEADER:", cookieHeader || "EMPTY");

  const res = await fetch(`/api/auth/me`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });
  console.log("AUTH /me STATUS:", res.status);


  if (!res.ok) return null;

  return res.json();
}


// FETCH LOGGED IN USER APPLICATIONS

export async function getLoggedInUserApplicationsServer() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`/api/applications/my`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user applications");
  }

  return res.json();
}

export async function getLoggedInJobSeekerServer() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join(";")

  try {
    const res = await fetch(`/api/jobseekers/my`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store"
    })
    if (!res.ok) {
      throw new Error("Failed to fetch jobSeeker")
    }
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch jobseeker" + JSON.stringify(error));
  }

}

export async function getLoggedInEmployerServer() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join(";")

  try {
    const res = await fetch(`/api/employers/my`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store"
    })
    if (!res.ok) {
      throw new Error("Failed to fetch employer")
    }
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch employer" + JSON.stringify(error));
  }
}