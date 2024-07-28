import { getAllProducts } from "@/lib/products";
import Link from "next/link";

export default async function ProductsPage() {
    const products = await getAllProducts();

    return (
        <div>
            <h1>商品一覧</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link href={`/products/${product.id}`}>
                            {product.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
