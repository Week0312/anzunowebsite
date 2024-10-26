"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
        console.log("Dark mode toggled:", !darkMode);
    };

    return (
        <AppContext.Provider value={{ darkMode, toggleDarkMode }}>
            <div
                className={`p-4 ${
                    darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
            >
                Dark Mode: {darkMode ? "On" : "Off"}
                {children}
            </div>
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
