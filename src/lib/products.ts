// 製品カテゴリーの定義
export type ProductCategory = "plate" | "bowl" | "cup" | "vase";

// 製品の状態を定義
export type ProductStatus = "in_stock" | "low_stock" | "out_of_stock";

// 基本的な製品インターフェース
export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    category?: ProductCategory;
    status?: ProductStatus;
    createdAt?: string;
    updatedAt?: string;
}

// より詳細な製品情報のインターフェース
export interface ProductDetail extends Product {
    longDescription?: string;
    specifications?: {
        dimensions?: string;
        weight?: string;
        material?: string;
        careInstructions?: string;
    };
    relatedProducts?: string[]; // 関連製品のID
}

// サンプル製品データ
export const products: Product[] = [
    {
        id: "1",
        name: "皿",
        description: "繊細なデザインが施された美しい皿です。",
        price: "13,800円",
        image: "/images/products/photo1.jpg",
        category: "plate",
        status: "in_stock",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
    },
    {
        id: "2",
        name: "茶碗",
        description: "繊細なデザインが施された美しい茶碗です。",
        price: "9,800円",
        image: "/images/products/photo2.jpg",
        category: "bowl",
        status: "in_stock",
        createdAt: "2024-01-02",
        updatedAt: "2024-01-02",
    },
    // 他の製品データ...
];

// 製品データ取得用のユーティリティ関数
export async function getProductById(id: string): Promise<Product | null> {
    try {
        const product = products.find((product) => product.id === id);
        if (!product) {
            console.warn(`Product with ID ${id} not found`);
            return null;
        }
        return product;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        return null;
    }
}

export async function getAllProducts(): Promise<Product[]> {
    try {
        // 将来的にデータベースからの取得に変更する可能性を考慮
        return products;
    } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
}

export async function getNewArrivals(count: number = 3): Promise<Product[]> {
    try {
        // createdAt でソートして最新の製品を返す
        const sortedProducts = [...products].sort(
            (a, b) =>
                new Date(b.createdAt || "").getTime() -
                new Date(a.createdAt || "").getTime()
        );
        return sortedProducts.slice(0, count);
    } catch (error) {
        console.error("Error fetching new arrivals:", error);
        return [];
    }
}

// 追加のユーティリティ関数
export async function getProductsByCategory(
    category: ProductCategory
): Promise<Product[]> {
    try {
        return products.filter((product) => product.category === category);
    } catch (error) {
        console.error(
            `Error fetching products in category ${category}:`,
            error
        );
        return [];
    }
}

export function formatPrice(price: string): string {
    // 価格文字列から数値を抽出し、フォーマットする
    const numericPrice = price.replace(/[^0-9]/g, "");
    return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
    }).format(Number(numericPrice));
}

// 在庫状態の確認
export function checkProductStatus(product: Product): ProductStatus {
    // ここでは簡単な実装ですが、実際のアプリケーションでは
    // 在庫数などに基づいて状態を判定します
    return product.status || "in_stock";
}
