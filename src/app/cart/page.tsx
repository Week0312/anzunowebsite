"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">カートは空です</h1>
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
            <h1 className="text-2xl font-bold mb-4">ショッピングカート</h1>
            {cart.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center mb-4 pb-4 border-b"
                >
                    <div className="w-24 h-24 relative mr-4">
                        <Image
                            src={item.image}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-600">{item.price}</p>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                            }
                            className="bg-gray-200 px-2 py-1 rounded"
                        >
                            -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                            }
                            className="bg-gray-200 px-2 py-1 rounded"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                    >
                        削除
                    </button>
                </div>
            ))}
            <div className="mt-8">
                <div className="text-xl font-bold mb-4">
                    合計: ¥{total.toFixed(2)}
                </div>
                <Link
                    href="/checkout"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    チェックアウトへ進む
                </Link>
            </div>
        </div>
    );
}
