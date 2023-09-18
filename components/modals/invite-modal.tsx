"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";

const InviteModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "invite";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-4">
          <DialogTitle className="font-bold text-center text-2xl">
            Invite friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-2">
          <Label className="">Server invite link</Label>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
