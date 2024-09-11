export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "皿",
        description: "繊細なデザインが施された美しい皿です。",
        price: "13,800円",
        image: "/images/products/photo1.jpg",
    },
    {
        id: "2",
        name: "茶碗",
        description: "繊細なデザインが施された美しい茶碗です。",
        price: "9,800円",
        image: "/images/products/photo2.jpg",
    },
    // 他の製品データ...
];

export async function getProductById(id: string): Promise<Product | null> {
    return products.find((product) => product.id === id) || null;
}

export async function getAllProducts(): Promise<Product[]> {
    return products;
}

// 新着作品を取得する関数を追加
export async function getNewArrivals(count: number = 3): Promise<Product[]> {
    // ここでは単純に最後の3つの製品を「新着」として返していますが、
    // 実際のアプリケーションでは、データベースから最新の製品を取得する処理を実装します。
    return products.slice(-count);
}
