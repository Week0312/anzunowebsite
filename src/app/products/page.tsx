import { Metadata } from "next";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
    title: "製品一覧",
    description:
        "Your Company Nameが提供する製品とサービスの詳細をご覧ください。",
};

export default function ProductsPage() {
    return <ProductsContent />;
}
