import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DialogMenu {
  isOpen:boolean,
  open: () => void,
  close: () => void,
}


type UserPreferenceState = {
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string) => void;
  clearSelectedAddressId: () => void;
};


export const useUserPreferenceStore = create<UserPreferenceState>()(
  persist(
    (set) => ({
      selectedAddressId: null,

      setSelectedAddressId: (id) => set({ selectedAddressId: id }),
      clearSelectedAddressId: () => set({ selectedAddressId: '' }),
    }),
    {
      name: 'user-preference-st', // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useDialogStateStore = create<DialogMenu>() ((set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),       
    }));

