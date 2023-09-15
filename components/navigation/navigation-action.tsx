"use client";

import { Plus } from "lucide-react";
import { ActionToolTip } from "../action-tooltip";

export const NavigationAction = () => {
  return (
    <div>
      <ActionToolTip side="right" align="center" label="Add a server">
        <button className="group">
          <div className="mt-2 dark:bg-neutral-700 group-hover:bg-emerald-500 bg-background w-[48px] h-[48px] transition-all rounded-[24px] group-hover:rounded-[16px] flex justify-center items-center">
            <Plus
              className="group-hover:text-white text-emerald-500 transition"
              size={25}
            ></Plus>
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
};
