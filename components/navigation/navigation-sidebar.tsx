import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { NavigationItem } from "./navigation-item";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="w-full h-full dark:bg-[#1e1f22] flex text-primary flex-col space-y-4 py-2 items-center">
      <NavigationAction></NavigationAction>
      <Separator className="h-[2px] rounded-md dark:bg-zinc-700 bg-zinc-300 mx-auto w-10 " />

      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <NavigationItem
            id={server.id}
            name={server.name}
            imageUrl={server.imageUrl}
          />
        ))}
      </ScrollArea>
      <div className="pb-3 gap-y-4 mt-auto flex flex-col items-center">
        <ModeToggle></ModeToggle>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-[48px] h-[48px]",
            },
          }}
        ></UserButton>
      </div>
    </div>
  );
};
