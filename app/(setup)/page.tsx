import InitialModel from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const SetupPage = async () => {
  const profile = await initialProfile(); // --> profile.create

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

//xnzgljnukyuzlocyod4p:pscale_pw_YBka3QGl8P1fRCtbwx7kgcVwllXCeXPSuSNxgM3iBep@aws.connect.psdb.cloud/ertyeyrt?sslaccept=strict'
