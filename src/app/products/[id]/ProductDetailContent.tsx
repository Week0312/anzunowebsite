"use client";

import { Product } from "@/lib/products";

interface ProductDetailContentProps {
    product: Product | null;
}

export default function ProductDetailContent({
    product,
}: ProductDetailContentProps) {
    if (!product) return <div>商品が見つかりません</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>価格: {product.price}</p>
        </div>
    );
}
