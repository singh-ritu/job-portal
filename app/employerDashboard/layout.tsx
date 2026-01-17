// app/employer/dashboard/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Sidebar from "../../components/EmployerSidebar";
import { USER_ENUMS } from "../enums/user.enums";


function getUserFromToken(token: string | undefined) {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
    return decoded;
  } catch {
    return null;
  }
}


export default async function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? "";

  const user = getUserFromToken(token);

  if (!user) redirect("/login");
  if (user.role !== USER_ENUMS.EMPLOYER) redirect("/unauthorized");

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
