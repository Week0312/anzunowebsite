import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

// 認証が必要なパス
const protectedPaths = ["/dashboard", "/profile", "/cart", "/orders"];

// 認証済みユーザーがアクセスできないパス
const authPaths = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("token")?.value;

    // 認証が必要なパスへのアクセス
    if (protectedPaths.some((path) => pathname.startsWith(path))) {
        if (!token) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("from", pathname);
            return NextResponse.redirect(url);
        }

        try {
            verify(token, process.env.JWT_SECRET!);
        } catch (error) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("from", pathname);
            return NextResponse.redirect(url);
        }
    }

    // 認証済みユーザーがアクセスできないパスへのアクセス
    if (authPaths.some((path) => pathname.startsWith(path))) {
        if (token) {
            try {
                verify(token, process.env.JWT_SECRET!);
                return NextResponse.redirect(new URL("/", request.url));
            } catch (error) {
                // トークンが無効な場合はそのまま進む
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/cart/:path*",
        "/orders/:path*",
        "/auth/:path*",
    ],
};
