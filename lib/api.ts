/* eslint-disable @typescript-eslint/no-explicit-any */
export async function registerUser(data: any) {
  const res = await fetch("/api/register", {
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

export async function loginUser(data: any) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}
