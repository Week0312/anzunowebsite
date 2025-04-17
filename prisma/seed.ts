import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // 管理者ユーザーの作成
    const adminPassword = await hash("admin123", 10);
    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            password: adminPassword,
            name: "管理者",
            role: "admin",
            address: "東京都渋谷区",
            phone: "03-1234-5678",
        },
    });

    // 一般ユーザーの作成
    const userPassword = await hash("user123", 10);
    const user = await prisma.user.upsert({
        where: { email: "user@example.com" },
        update: {},
        create: {
            email: "user@example.com",
            password: userPassword,
            name: "一般ユーザー",
            address: "東京都新宿区",
            phone: "03-8765-4321",
        },
    });

    // 商品カテゴリーの定義
    const categories = ["アクセサリー", "雑貨", "文房具", "その他"];

    // 商品データの作成
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: "ハンドメイドネックレス",
                description: "天然石を使用したオリジナルネックレス",
                price: 3500,
                stock: 10,
                category: "アクセサリー",
                imageUrl: "/images/necklace.jpg",
                isActive: true,
            },
        }),
        prisma.product.create({
            data: {
                name: "手作りポーチ",
                description: "オーガニックコットン使用のポーチ",
                price: 2800,
                stock: 15,
                category: "雑貨",
                imageUrl: "/images/pouch.jpg",
                isActive: true,
            },
        }),
        prisma.product.create({
            data: {
                name: "オリジナルノート",
                description: "手漉き和紙を使用したノート",
                price: 1200,
                stock: 20,
                category: "文房具",
                imageUrl: "/images/notebook.jpg",
                isActive: true,
            },
        }),
    ]);

    // カートの作成
    const cart = await prisma.cart.create({
        data: {
            userId: user.id,
            items: {
                create: [
                    {
                        productId: products[0].id,
                        quantity: 2,
                    },
                    {
                        productId: products[1].id,
                        quantity: 1,
                    },
                ],
            },
        },
        include: {
            items: true,
        },
    });

    // 注文の作成
    const order = await prisma.order.create({
        data: {
            userId: user.id,
            status: "pending",
            total: products[0].price * 2 + products[1].price,
            address: user.address!,
            phone: user.phone!,
            items: {
                create: [
                    {
                        productId: products[0].id,
                        quantity: 2,
                        price: products[0].price,
                    },
                    {
                        productId: products[1].id,
                        quantity: 1,
                        price: products[1].price,
                    },
                ],
            },
        },
    });

    console.log("テストデータの作成が完了しました");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
