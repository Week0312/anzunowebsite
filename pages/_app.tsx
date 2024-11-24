import type { AppProps } from "next/app";
import Link from "next/link";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

// NavigationコンポーネントをAuthProviderの中で使用するためのラッパー
const NavigationWithAuth = () => {
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
            </ul>
        </nav>
    );
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <NavigationWithAuth />
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
