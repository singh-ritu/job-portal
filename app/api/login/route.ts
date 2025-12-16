import { NextResponse } from "next/server";

const BACKEND_URL = "http://127.0.0.1:8000";


export async function POST(req: Request) {
  try {
    console.log("🔹 Login proxy hit");

    const body = await req.json();
    console.log("🔹 Request body:", body);

    const backendResponse = await fetch(
      `${BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );
        let data;
      try {
        data = await backendResponse.json();
      } catch (err) {
        console.error("Failed to parse backend JSON:", err);
        return NextResponse.json(
          { success: false, message: "Backend returned invalid JSON" },
          { status: 500 }
        );
      }

    console.log("🔹 Backend status:", backendResponse.status);

        const normalized = {
        success: backendResponse.ok, 
        message: data.message || (backendResponse.ok ? "success" : "failed"),
        token: data.token,           
        user:data.user,
        role:data.user?.role            
      };

      return NextResponse.json(normalized, { status: backendResponse.status });
  } catch (err) {
    console.error("❌ Proxy crash:", err);

    return NextResponse.json(
      {
        message: "Login proxy failed",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
