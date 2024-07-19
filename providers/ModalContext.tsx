"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext<any>({
  activeModal: null,
});

export const ModalContextProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modal) => {
    setActiveModal(modal);
  };

  return (
    <ModalContext.Provider value={{ activeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
