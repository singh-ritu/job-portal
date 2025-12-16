/* eslint-disable @typescript-eslint/no-explicit-any */
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

