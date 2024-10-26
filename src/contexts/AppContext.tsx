"use client";

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

type AppContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [darkMode, setDarkMode] = useState(false);

    // ダークモード設定をローカルストレージから読み込む
    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode !== null) {
            setDarkMode(savedMode === "true");
        }
    }, []);

    // ダークモード切り替え時の処理
    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("darkMode", String(newMode));
            // HTMLのdata-theme属性を更新
            document.documentElement.classList.toggle("dark", newMode);
            return newMode;
        });
    };

    return (
        <AppContext.Provider value={{ darkMode, toggleDarkMode }}>
            <div className={darkMode ? "dark" : ""}>{children}</div>
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
