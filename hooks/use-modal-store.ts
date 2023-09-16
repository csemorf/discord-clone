import { create } from "zustand";

export type ModalType = "createServer";

interface ModelStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}
export const useModal = create<ModelStore>((set) => ({
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
  type: null,
}));
