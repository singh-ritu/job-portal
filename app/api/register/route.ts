import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Proxy received body:", body);

    const backendResponse = await fetch(
      "http://localhost:6000/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    console.log("Backend response status:", backendResponse.status);

    // Attempt to parse backend JSON
    let data;
    try {
      data = await backendResponse.json();
    } catch (err) {
      console.error("Failed to parse backend JSON:", err);
      return NextResponse.json(
        { message: "Backend returned invalid JSON" },
        { status: 500 }
      );
    }

    console.log("Backend response data:", data);

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Register proxy failed", error: (error as Error).message },
      { status: 500 }
    );
  }
}
