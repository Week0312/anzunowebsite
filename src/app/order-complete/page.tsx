"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// OrderCompleteContent コンポーネント
const OrderCompleteContent = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

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
};

// メインのページコンポーネント
export default function OrderCompletePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderCompleteContent />
        </Suspense>
    );
}

// このページを動的レンダリングに設定
export const dynamic = "force-dynamic";
