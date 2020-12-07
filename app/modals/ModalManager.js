import React from "react";
import TestModal from "./TestModal"

function ModalManager({ children }) {
    return (
        <>
            <TestModal/>
            <>{children}</>
        </>
);}

export default ModalManager;