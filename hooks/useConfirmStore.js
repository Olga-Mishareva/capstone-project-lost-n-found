import { create } from "zustand";

const useConfirmStore = create((set) => {
  return {
    popupIsOpen: false,
    confirm: false,

    handleOpenPopup: () => {
      set((currentState) => {
        return {
          popupIsOpen: true,
        };
      });
    },

    handleClosePopup: () => {
      set((currentState) => {
        return {
          confirm: false,
          popupIsOpen: false,
        };
      });
    },

    handleConfirm: () => {
      set((currentState) => {
        return {
          confirm: true,
          popupIsOpen: false,
        };
      });
    },
  };
});

export default useConfirmStore;
