import React from "react";
import TestModal from "./TestModal"
import LevelUpModal from "./LevelUpModal"

function ModalManager({ children }) {
    return (
        <>
            <TestModal/>
            <LevelUpModal/>
            <>{children}</>
        </>
);}

export default ModalManager;