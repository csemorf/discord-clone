"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  role?: MemberRole;
  server: ServerWithMembersWithProfiles;
}

const ServerHeader = ({ role, server }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="border-b-2 font-semibold w-full h-12 px-2 flex items-center border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700/10 text-lg dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="w-5 h-5 ml-auto"></ChevronDown>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-black dark:text-neutral-400 w-56 text-xs font-medium space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="text-indigo-600 dark:text-indigo-400 cursor-pointer text-lg px-3 py-2 "
          >
            Invite people
            <UserPlus className="ml-auto w-4 h-4"></UserPlus>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="cursor-pointer text-lg px-3 py-2 ">
            Server Settings
            <Settings className="ml-auto w-4 h-4"></Settings>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="cursor-pointer text-lg px-3 py-2 ">
            Managers Members
            <Users className="ml-auto w-4 h-4"></Users>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="cursor-pointer text-lg px-3 py-2 ">
            Create Channel
            <PlusCircle className="ml-auto w-4 h-4"></PlusCircle>
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator></DropdownMenuSeparator>}
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer text-lg px-3 py-2 text-rose-500">
            Delete Channel
            <Trash className=" ml-auto w-4 h-4"></Trash>
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="cursor-pointer text-lg px-3 py-2 text-rose-500">
            Logout
            <Trash className=" ml-auto w-4 h-4"></Trash>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
