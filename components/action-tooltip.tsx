"use client";

import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "./ui/tooltip";

interface ActionToolTipProps {
  label: string;
  side?: "top" | "left" | "right" | "bottom";
  align?: "start" | "end" | "center";
  children: React.ReactNode;
}
export const ActionToolTip = ({
  label,
  side,
  align,
  children,
}: ActionToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="text-sm capitalize">{label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
