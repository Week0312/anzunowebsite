"use client";

import { useState, useEffect } from "react";
import { getProductById, Product } from "@/lib/products";

export default function ProductDetailContent({
    productId,
}: {
    productId: string;
}) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            const fetchedProduct = await getProductById(productId);
            setProduct(fetchedProduct);
        }
        fetchProduct();
    }, [productId]);

    if (!product) return <div>読み込み中...</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>価格: {product.price}</p>
        </div>
    );
}
