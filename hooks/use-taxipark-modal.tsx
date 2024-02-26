import { create } from "zustand";

interface useTaxiparkModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTaxiparkModal = create<useTaxiparkModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
