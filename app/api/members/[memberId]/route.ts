import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { URL } from "url";
export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  const profile = await currentProfile();

  if (!params.memberId) {
    return new NextResponse("missing memberid", { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const serverId = searchParams.get("serverId");

  if (!serverId) {
    return new NextResponse("missing serverId", { status: 400 });
  }

  if (!profile) return new NextResponse("unauth", { status: 401 });

  const server = await db.server.update({
    where: { profileId: profile.id, id: serverId },
    data: {
      members: {
        deleteMany: {
          id: params.memberId,
          profileId: {
            not: profile.id,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  return NextResponse.json(server);
}
export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("unauthorized", { status: 401 });
    const { role } = await req.json();

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("miossing serverid", { status: 400 });

    if (!params.memberId)
      return new NextResponse("member id missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              profileId: { not: profile.id },
              id: params.memberId,
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { role: "asc" },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("internal error", { status: 500 });
  }
}
