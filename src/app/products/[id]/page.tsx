"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/lib/products";
import { useState, useEffect } from "react";

// Product 型を定義
type Product = {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    // 他の必要なプロパティがあれば追加してください
};

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            const fetchedProduct = await getProductById(params.id);
            setProduct(fetchedProduct as Product);
        }
        fetchProduct();
    }, [params.id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000); // 2秒後にメッセージを非表示
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-96 md:h-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {product.description}
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                        {product.price}
                    </p>
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        カートに追加
                    </button>
                    {isAdded && (
                        <p className="text-green-500 mt-2">
                            商品がカートに追加されました！
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
