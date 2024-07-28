import { Metadata } from "next";
import ProductDetailContent from "./ProductDetailContent";
import { getProductById } from "@/lib/products"; // 製品データを取得する関数（後で実装）

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const product = await getProductById(params.id);
    return {
        title: `${product.name} | 製品詳細`,
        description: product.description,
    };
}

export default function ProductPage({ params }: { params: { id: string } }) {
    return <ProductDetailContent id={params.id} />;
}
