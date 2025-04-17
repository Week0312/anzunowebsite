import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // バリデーション
        if (!email || !password) {
            return NextResponse.json(
                { error: "メールアドレスとパスワードは必須です" },
                { status: 400 }
            );
        }

        // ユーザーを検索
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "メールアドレスまたはパスワードが正しくありません" },
                { status: 401 }
            );
        }

        // パスワードの検証
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "メールアドレスまたはパスワードが正しくありません" },
                { status: 401 }
            );
        }

        // JWTトークンの生成
        const token = sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        // クッキーにトークンを設定
        cookies().set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1日
            path: "/",
        });

        // ユーザー情報を返す（パスワードは除外）
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "ログイン処理中にエラーが発生しました" },
            { status: 500 }
        );
    }
}
