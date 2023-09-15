import InitialModel from "@/components/models/initial-model";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
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
      <InitialModel></InitialModel>
    </div>
  );
};

export default SetupPage;
