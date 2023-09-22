import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn(className, "md:h-10 md:w-10 h-7 w-7")}>
      <AvatarImage src={src}></AvatarImage>
    </Avatar>
  );
};
