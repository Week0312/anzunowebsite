"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderCompletePage() {
    const [orderId, setOrderId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        setOrderId(searchParams.get("orderId"));
    }, [searchParams]);

    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">
                ご注文ありがとうございます！
            </h1>
            {orderId && <p className="mb-4">注文ID: {orderId}</p>}
            <p className="mb-8">
                注文が正常に処理されました。確認メールをお送りしましたのでご確認ください。
            </p>
            <Link
                href="/products"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                商品一覧に戻る
            </Link>
        </div>
    );
}
