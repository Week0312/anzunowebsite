"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
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

    // 合計金額の計算を関数として分離
    const calculateTotal = () => {
        return cart.reduce(
            (sum, item) =>
                sum +
                Number(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
            0
        );
    };

    const total = calculateTotal();

    const onSubmit = async (formData: FormData) => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);

            // 注文処理のAPIリクエストを想定
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    items: cart,
                    total,
                }),
            });

            if (!response.ok) {
                throw new Error("注文処理中にエラーが発生しました");
            }

            // 注文成功時の処理
            clearCart();
            router.push("/thank-you");
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "注文処理中にエラーが発生しました"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">カートが空です</h1>
                    <button
                        onClick={() => router.push("/products")}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        商品一覧に戻る
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">チェックアウト</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 注文フォーム */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6">お客様情報</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-2"
                            >
                                お名前
                            </label>
                            <input
                                id="name"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                                {...register("name", {
                                    required: "お名前は必須です",
                                })}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                            >
                                メールアドレス
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                                {...register("email", {
                                    required: "メールアドレスは必須です",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message:
                                            "有効なメールアドレスを入力してください",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium mb-2"
                            >
                                配送先住所
                            </label>
                            <input
                                id="address"
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                                {...register("address", {
                                    required: "配送先住所は必須です",
                                })}
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        {submitError && (
                            <div className="p-4 bg-red-50 dark:bg-red-900 text-red-500 rounded-md">
                                {submitError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors
                                ${
                                    isSubmitting
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                        >
                            {isSubmitting ? "処理中..." : "注文を確定する"}
                        </button>
                    </form>
                </div>

                {/* 注文内容サマリー */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6">注文内容</h2>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center py-2 border-b dark:border-gray-700"
                            >
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        数量: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-semibold">{item.price}</p>
                            </div>
                        ))}
                        <div className="pt-4 border-t dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">合計</p>
                                <p className="text-lg font-bold">
                                    ¥{total.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
