"use client";

import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between">
                <div className="flex space-x-4">
                    <Link href="/news" className="hover:underline">
                        お知らせ
                    </Link>
                    <Link href="/products" className="hover:underline">
                        商品ページ
                    </Link>
                    <Link href="/contact" className="hover:underline">
                        お問い合わせ
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
