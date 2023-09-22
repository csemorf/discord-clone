import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,

  { params }: { params: { serverId: string } }
) {
  const profile = await currentProfile();
  const { name, imageUrl } = await req.json();

  try {
    if (!profile) return new NextResponse("unauthorized", { status: 401 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("internal server", { status: 500 });
  }
}
