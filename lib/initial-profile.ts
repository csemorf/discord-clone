import { db } from "@/lib/db";
import { log } from "console";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const returnBackUrl = "http://localhost:3000/sign-in";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) return profile;

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
