"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getProductById } from "@/lib/products";

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
}

const ProductDetailContent: React.FC<{ id: string }> = ({ id }) => {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(id);
            setProduct(productData);
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>読み込み中...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-96">
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
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                        {product.price}
                    </p>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                        カートに追加
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailContent;
