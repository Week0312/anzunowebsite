"use client";

import { useAppContext } from "../context/AppContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { darkMode } = useAppContext();

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div
                className={`${
                    darkMode
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-900"
                }`}
            >
                {children}
            </div>
        </div>
    );
}
