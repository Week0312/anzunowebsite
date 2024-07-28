import { getProductById } from "@/lib/products";
import { Metadata } from "next";
import ProductDetailContent from "./ProductDetailContent";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    const product = await getProductById(params.id);
    return {
        title: product ? `${product.name} | 商品詳細` : "商品が見つかりません",
        description: product?.description || "",
    };
}

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    const product = await getProductById(params.id);
    return <ProductDetailContent product={product} />;
}
