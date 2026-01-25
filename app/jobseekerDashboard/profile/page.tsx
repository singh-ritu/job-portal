import { getLoggedInJobSeekerServer } from "@/lib/api.server";
import ProfileClient from "./profileClient";


export default async function ProfilePage() {
  const jobSeeker = await getLoggedInJobSeekerServer();
  console.log(jobSeeker);

  if (!jobSeeker) {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <ProfileClient user={jobSeeker} />
    </div>
  );
}
