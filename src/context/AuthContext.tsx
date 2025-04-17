// src/context/AuthContext.tsx
"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface ExtendedUser extends User {
    name?: string;
    address?: string;
    phone?: string;
}

interface AuthContextType {
    user: ExtendedUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (userData: Partial<ExtendedUser>) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ExtendedUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/auth/me");
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "ログインに失敗しました");
            }

            const userData = await response.json();
            setUser(userData);
            router.push("/");
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
            });
            setUser(null);
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };

    const updateUser = (userData: Partial<ExtendedUser>) => {
        setUser((prev) => (prev ? { ...prev, ...userData } : null));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                updateUser,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
