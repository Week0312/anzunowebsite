"use client";

import { Inter } from "next/font/google";
import { AppProvider, useAppContext } from "../context/AppContext";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/globals.css";
import "swiper/css";
import "swiper/css/autoplay";

const inter = Inter({ subsets: ["latin"] });

function RootLayoutContent({ children }: { children: React.ReactNode }) {
    const { darkMode } = useAppContext();

    return (
        <html lang="ja" className={darkMode ? "dark" : ""}>
            <body
                className={`${inter.className} flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900`}
            >
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppProvider>
            <CartProvider>
                <RootLayoutContent>{children}</RootLayoutContent>
            </CartProvider>
        </AppProvider>
    );
}
