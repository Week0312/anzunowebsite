"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 商品の型定義
interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
}

// カート内の商品の型定義
interface CartItem extends Product {
    quantity: number;
}

// カートコンテキストの型定義
interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

// カートコンテキストの作成
const CartContext = createContext<CartContextType | undefined>(undefined);

// カートプロバイダーの型定義
interface CartProviderProps {
    children: React.ReactNode;
}

// カートプロバイダーコンポーネント
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // ローカルストレージからカートの状態を読み込む
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // カートの状態が変更されたらローカルストレージに保存
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // カートに商品を追加
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id
            );
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // カートから商品を削除
    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    // 商品の数量を更新
    const updateQuantity = (productId: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    // カートを空にする
    const clearCart = () => {
        setCart([]);
    };

    // カート内の商品の合計数を計算
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // カート内の商品の合計金額を計算
    const getTotalPrice = () => {
        return cart.reduce(
            (total, item) => total + Number(item.price) * item.quantity,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// カートコンテキストを使用するためのカスタムフック
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
