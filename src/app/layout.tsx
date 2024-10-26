// [追加] 新しいインポート
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "../context/AppContext";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientLayout from "./ClientLayout";

// [変更] Swiperのスタイルインポートを削除
import "../styles/globals.css";

// [変更] フォントの設定を更新
const inter = Inter({
    subsets: ["latin"],
    // [追加] 表示の最適化オプション
    display: "swap",
});

// [追加] メタデータの設定
export const metadata: Metadata = {
    title: {
        default: "手作り陶器コレクション",
        template: "%s | 手作り陶器コレクション",
    },
    description:
        "50年以上の経験を持つ当社が、最高級の手作り陶器をお届けします。",
    keywords: ["陶器", "手作り", "陶芸", "工芸品", "伝統工芸"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // [変更] lang属性とクラス名を更新
        <html lang="ja">
            {/* [変更] クラス名を更新し、背景色を変数で制御 */}
            <body className={`${inter.className} bg-background antialiased`}>
                <AppProvider>
                    <CartProvider>
                        <ClientLayout>
                            {/* [変更] レイアウト構造を最適化 */}
                            <div className="flex min-h-screen flex-col">
                                <Header />
                                <main className="flex-grow">{children}</main>
                                <Footer />
                            </div>
                        </ClientLayout>
                    </CartProvider>
                </AppProvider>
            </body>
        </html>
    );
}
