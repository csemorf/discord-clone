import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const profile = await currentProfile();
  const { name, imageUrl } = await req.json();

  try {
    if (!profile) {
      throw new NextResponse("unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        inviteCode: uuidv4(),
        name,
        imageUrl,
        profileId: profile.id,
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    throw new NextResponse("server internal error", { status: 500 });
  }
}
