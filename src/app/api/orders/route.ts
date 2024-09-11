import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // ここで注文データの検証を行います
        if (!body.customerInfo || !body.cart || body.cart.length === 0) {
            return NextResponse.json(
                { error: "無効な注文データです" },
                { status: 400 }
            );
        }

        // 実際のアプリケーションでは、ここでデータベースに注文を保存します
        console.log("注文を受け付けました:", body);

        // 注文確認メールを送信するロジックもここに追加できます

        return NextResponse.json(
            {
                message: "注文が正常に処理されました",
                orderId: "ORDER-" + Date.now(),
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("注文処理中にエラーが発生しました:", error);
        return NextResponse.json(
            { error: "注文処理中にエラーが発生しました" },
            { status: 500 }
        );
    }
}
