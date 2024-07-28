"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
    // ... 製品データは変更なし ...
];

const ProductsContent = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                商品一覧
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
                    >
                        <Link href={`/products/${product.id}`}>
                            <div className="relative h-64">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {product.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {product.price}
                                    </span>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                        カートに追加
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsContent;
