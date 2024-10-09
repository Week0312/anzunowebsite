import type { AppProps } from "next/app";
import Link from "next/link";
import { AuthProvider, useAuth } from "../src/contexts/AuthContext";

function Navigation() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link href="/register">Register</Link>
                        </li>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                )}
                {/* 他のナビゲーションリンクをここに追加 */}
            </ul>
        </nav>
    );
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <div>
                <Navigation />
                <Component {...pageProps} />
            </div>
        </AuthProvider>
    );
}

export default MyApp;
