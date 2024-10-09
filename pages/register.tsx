import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        if (!token) {
            router.push("/pre-register");
        }
    }, [token, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, token }),
            });

            if (response.ok) {
                router.push("/login");
            } else {
                const data = await response.json();
                setError(data.message || "An error occurred");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    if (!token) {
        return null; // or a loading state
    }

    return (
        <div>
            <h1>Complete Registration</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Complete Registration</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
