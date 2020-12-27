import React from "react";
import LevelUpModal from "./LevelUpModal";

function ModalManager({ children }) {
  return (
    <>
      <LevelUpModal />
      <>{children}</>
    </>
  );
}

export default ModalManager;
