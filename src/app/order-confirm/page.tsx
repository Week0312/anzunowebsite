"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

// CustomerInfo の型を定義
type CustomerInfo = {
    name: string | null;
    email: string | null;
    address: string | null;
};

export default function OrderConfirmPage() {
    const { cart, clearCart } = useCart();
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

    useEffect(() => {
        // URLからクエリパラメータを取得
        const params = new URLSearchParams(window.location.search);
        const info: CustomerInfo = {
            name: params.get("name"),
            email: params.get("email"),
            address: params.get("address"),
        };
        setCustomerInfo(info);
    }, []);

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
        0
    );

    const handleConfirm = async () => {
        // ここで最終的な注文処理を行う（APIへのPOSTリクエストなど）
        console.log("Order confirmed:", { customerInfo, cart, total });
        clearCart();
        // 注文完了ページへリダイレクト
        window.location.href = "/order-complete";
    };

    if (!customerInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">注文内容の確認</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">お客様情報</h2>
                    <p>
                        <strong>お名前:</strong> {customerInfo.name}
                    </p>
                    <p>
                        <strong>メールアドレス:</strong> {customerInfo.email}
                    </p>
                    <p>
                        <strong>住所:</strong> {customerInfo.address}
                    </p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">注文内容</h2>
                    {cart.map((item) => (
                        <div key={item.id} className="mb-2">
                            <span>{item.name}</span>
                            <span className="float-right">
                                {item.price} x {item.quantity}
                            </span>
                        </div>
                    ))}
                    <div className="mt-4 text-xl font-bold">
                        合計: ¥{total.toFixed(2)}
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={handleConfirm}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
                >
                    注文を確定する
                </button>
                <Link
                    href="/checkout"
                    className="text-blue-500 hover:text-blue-600"
                >
                    チェックアウトに戻る
                </Link>
            </div>
        </div>
    );
}
