"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// アプリケーションコンテキストの型定義
interface AppContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

// アプリケーションコンテキストの作成
const AppContext = createContext<AppContextType | undefined>(undefined);

// アプリケーションプロバイダーの型定義
interface AppProviderProps {
    children: React.ReactNode;
}

// アプリケーションプロバイダーコンポーネント
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    // ローカルストレージからダークモードの設定を読み込む
    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode !== null) {
            setDarkMode(JSON.parse(savedDarkMode));
        }
    }, []);

    // ダークモードの設定が変更されたらローカルストレージに保存
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    // ダークモードの切り替え
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <AppContext.Provider
            value={{
                darkMode,
                toggleDarkMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// アプリケーションコンテキストを使用するためのカスタムフック
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
