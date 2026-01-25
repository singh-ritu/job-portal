import { getLoggedInEmployerServer } from "@/lib/api.server";
import EmployerProfileClient from "./EmployerProfileClient";
export default async function ProfilePage() {

  const employer = await getLoggedInEmployerServer();
  console.log("Profile response", employer);

  if (!employer) {
    <p>Unauthorized</p>
  }

  return (
    <div>
      <EmployerProfileClient user={employer} />
    </div>
  );
}
