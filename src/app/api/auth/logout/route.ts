import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        // クッキーからトークンを削除
        cookies().delete("token");
        return NextResponse.json({ message: "ログアウトしました" });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "ログアウト処理中にエラーが発生しました" },
            { status: 500 }
        );
    }
}
