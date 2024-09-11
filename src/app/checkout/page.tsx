"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormData = {
    name: string;
    email: string;
    address: string;
};

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const router = useRouter();

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
        0
    );

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerInfo: data,
                    cart,
                    total,
                }),
            });

            if (!response.ok) {
                throw new Error("注文処理中にエラーが発生しました");
            }

            const result = await response.json();
            clearCart();
            router.push(`/order-complete?orderId=${result.orderId}`);
        } catch (error) {
            setSubmitError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">カートが空です</h1>
                <Link
                    href="/products"
                    className="text-blue-500 hover:text-blue-600"
                >
                    商品一覧に戻る
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">チェックアウト</h1>
            {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {submitError}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">お客様情報</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* フォームフィールドは変更なし */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "処理中..." : "注文を確定する"}
                        </button>
                    </form>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">注文内容</h2>
                    {/* カート内容の表示は変更なし */}
                </div>
            </div>
        </div>
    );
}
