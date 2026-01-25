import { getLoggedInEmployerServer } from "@/lib/api.server";
import EmployerProfileClient from "./EmployerProfileClient";
export default async function ProfilePage() {

  const employer = await getLoggedInEmployerServer();
  console.log("Profile response", employer);

  if (!employer) {
    <p>Unauthorized</p>
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <EmployerProfileClient user={employer} />
    </div>
  );
}
