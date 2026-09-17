// src/context/PanelContext.jsx
import { createContext, useContext, useState } from "react";

const PanelContext = createContext(null);

export function PanelProvider({ children }) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <PanelContext.Provider value={{ activeIndex, setActiveIndex }}>
            {children}
        </PanelContext.Provider>
    );
}

export function usePanel() {
    const ctx = useContext(PanelContext);
    if (!ctx) throw new Error("usePanel must be used within a PanelContext");
    return ctx;
}