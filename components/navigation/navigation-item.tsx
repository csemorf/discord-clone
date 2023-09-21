"use client";

import { cn } from "@/lib/utils";
import { ActionToolTip } from "../action-tooltip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();
  const onClick = () => {
    router.push(`/servers/${id}`);
  };
  return (
    <div className="my-2">
      <ActionToolTip label={name} align="center" side="right">
        <button onClick={onClick} className="group flex items-center relative">
          <div
            className={cn(
              "absolute bg-primary left-0 rounded-r-full w-[4px] transition-all",
              params?.serverId !== id && "group-hover:h-[20px]",
              params?.serverId === id ? "h-[36px]" : "h-[8px]"
            )}
          />
          <div
            className={cn(
              "relative group flex mx-3 overflow-hidden  w-[48px] h-[48px]  rounded-[24px] transition-all group-hover:rounded-[16px]",
              params?.serverId === id &&
                "text-primary bg-primary/10 rounded-[16px]"
            )}
          >
            <Image src={imageUrl} fill alt="Channel" />
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
};
