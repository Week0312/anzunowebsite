interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
}

const products: Product[] = [
    {
        id: "1",
        name: "優雅な花瓶",
        description: "繊細なデザインが施された美しい花瓶です。",
        price: "13,800円",
        image: "/images/vase.jpg",
    },
    {
        id: "2",
        name: "茶器セット",
        description: "4つの湯飲みと急須がセットになった茶器セットです。",
        price: "9,800円",
        image: "/images/teaset.jpg",
    },
    // 他の製品データ...
];

export async function getProductById(id: string): Promise<Product | null> {
    // 実際のアプリケーションでは、ここでデータベースやAPIからデータを取得します
    return products.find((product) => product.id === id) || null;
}
