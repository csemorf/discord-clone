import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("unauthorzied", { status: 401 });
    if (!params.serverId) {
      return new NextResponse("not found", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        profileId: profile.id,
        id: params.serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    if (server) return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse("interal error", { status: 500 });
  }
}
