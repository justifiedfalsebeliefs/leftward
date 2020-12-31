import React from "react";
// import LevelUpModal from "./LevelUpModal";
import ActionCompleteModal from "./ActionCompleteModal";
import LoadingModal from "./LoadingModal";

function ModalManager({ children }) {
  return (
    <>
      {/* <LevelUpModal /> */}
      <ActionCompleteModal />
      <LoadingModal />
      <>{children}</>
    </>
  );
}

export default ModalManager;
