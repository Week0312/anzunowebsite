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
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "予期せぬエラーが発生しました"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // ... 残りのコンポーネントコード ...
}
