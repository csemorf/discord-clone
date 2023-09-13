import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { UserButton, auth, currentUser } from "@clerk/nextjs";
import { log } from "console";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) redirect(`servers/${server.id}`);

  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
      Create a server
    </div>
  );
};

export default SetupPage;
