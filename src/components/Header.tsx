"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useCart } from "../context/CartContext";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useAppContext();
    const { cart } = useCart();

    const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-bold text-primary-600 dark:text-primary-400"
                >
                    Your Logo
                </Link>
                <nav className="hidden md:flex space-x-6">
                    <Link
                        href="/news"
                        className="text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                        ニュース
                    </Link>
                    <Link
                        href="/products"
                        className="text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                        製品
                    </Link>
                    <Link
                        href="/contact"
                        className="text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                        お問い合わせ
                    </Link>
                </nav>
                <div className="flex items-center">
                    <Link href="/cart" className="mr-4 relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                        aria-label={
                            darkMode
                                ? "ライトモードに切り替え"
                                : "ダークモードに切り替え"
                        }
                    >
                        {darkMode ? "🌞" : "🌙"}
                    </button>
                    <button
                        className="ml-4 md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="メニューを開く"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <nav className="md:hidden bg-white dark:bg-gray-800 py-4">
                    <Link
                        href="/news"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        ニュース
                    </Link>
                    <Link
                        href="/products"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        製品
                    </Link>
                    <Link
                        href="/contact"
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        お問い合わせ
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
