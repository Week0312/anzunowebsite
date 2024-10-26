"use client";

import { useAppContext } from "../context/AppContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { darkMode } = useAppContext();

    return (
        <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
            {children}
        </div>
    );
}
