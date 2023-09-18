"use client";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-store";

const InviteModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "invite";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-4">
          <DialogTitle className="font-bold text-center text-2xl">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Give your server a personality with a name a an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        Invite modal!
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
