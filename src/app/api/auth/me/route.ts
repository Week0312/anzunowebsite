import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "認証が必要です" },
                { status: 401 }
            );
        }

        // トークンの検証
        const decoded = verify(token, process.env.JWT_SECRET!) as {
            userId: number;
            email: string;
        };

        // ユーザー情報の取得
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            return NextResponse.json(
                { error: "ユーザーが見つかりません" },
                { status: 404 }
            );
        }

        // パスワードを除外して返す
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json(
            { error: "認証チェック中にエラーが発生しました" },
            { status: 500 }
        );
    }
}
