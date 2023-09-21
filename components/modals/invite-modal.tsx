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
import axios from "axios";

const InviteModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();

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

  const [isLoading, setIsLoading] = useState(false);
  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
              value={inviteUrl}
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
            ></Input>
            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {copied ? <Check></Check> : <Copy className="w-4 h-4 "></Copy>}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            size="sm"
            variant="link"
            className="text-xs  text-zinc-500 mt-4"
            onClick={onNew}
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
