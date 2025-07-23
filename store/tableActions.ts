import { create } from "zustand";

// Define the correct interface
interface SidebarDrawerState {
  data: any | null;
  isOpen: boolean;
  onOpenDrawer:(value:any) => void,
  onClose: () => void;
}

// Define the correct interface
interface GenericDialogBoxState{
  isOpen: boolean;
  open:() => void,
  close: () => void;
}

// Zustand store with correct typings
export const useSideBarDrawer = create<SidebarDrawerState>((set) => ({
  data: null,
  isOpen: false,
  onOpenDrawer: (value) => {
    console.log("Opening drawer with value:", value);
    set({ isOpen: true, data: value });
  },

  onClose: () => {
    console.log("Closing drawer");
    set({ isOpen: false});
  },

}));


// Factory function to create a store with specific type
export const useGenericDialogStore = create<GenericDialogBoxState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }));

