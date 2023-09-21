"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import { setTimeout } from "timers";

const InviteModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "invite";
  const origin = useOrigin();
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-4">
          <DialogTitle className="font-bold text-center text-2xl">
            Invite friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-2">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center gap-x-2 mt-2">
            <Input
              value={inviteUrl}
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
            ></Input>
            <Button size="icon" onClick={onCopy}>
              {copied ? <Check></Check> : <Copy className="w-4 h-4 "></Copy>}
            </Button>
          </div>
          <Button
            size="sm"
            variant="link"
            className="text-xs  text-zinc-500 mt-4"
          >
            Generate a New Link
            <RefreshCw size="" className="w-4 h-4 ml-2"></RefreshCw>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
