import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useAppContext();

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
                        {/* ハンバーガーメニューアイコン */}
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
            {/* モバイルメニュー */}
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
