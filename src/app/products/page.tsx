import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default async function ProductsPage() {
    const products = await getAllProducts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
                手作り陶器コレクション
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="relative h-64">
                            <Image
                                src={product.image || "/images/placeholder.jpg"} // 製品の画像パスを使用、ない場合はプレースホルダー
                                alt={product.name || "商品画像"} // 製品名をalt textとして使用
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                quality={75}
                                // product.idがstring型なので、比較を修正
                                priority={product.id === "1"} // 最初の画像のみpriorityを設定
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">
                                {product.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 h-12 overflow-hidden">
                                {product.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    {product.price}
                                </span>
                                <Link
                                    href={`/products/${product.id}`}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    詳細を見る
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
