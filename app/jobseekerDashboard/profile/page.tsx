import { getLoggedInUserServer } from "@/lib/api.server";
import ProfileClient from "./profileClient";
import { log } from "console";

export default async function ProfilePage() {
  const user = await getLoggedInUserServer();
  console.log(user);
  
  if (!user) {
    return <p>Unauthorized</p>;
  }

  return(
    <div className="container mx-auto p-4 mt-20">
       <ProfileClient user={user} />
    </div>
  );
}
