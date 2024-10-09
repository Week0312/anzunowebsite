import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ConfirmEmail() {
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading"
    );
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        if (token) {
            confirmEmail(token as string);
        }
    }, [token]);

    async function confirmEmail(confirmationToken: string) {
        try {
            const response = await fetch("/api/users/confirm-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: confirmationToken }),
            });

            if (response.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Confirmation error:", error);
            setStatus("error");
        }
    }

    if (status === "loading") {
        return <div>Confirming your email...</div>;
    }

    if (status === "success") {
        return (
            <div>
                <h1>Email Confirmed!</h1>
                <p>
                    Your email has been successfully confirmed. You can now log
                    in to your account.
                </p>
                <button onClick={() => router.push("/login")}>
                    Go to Login
                </button>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div>
                <h1>Confirmation Error</h1>
                <p>
                    There was an error confirming your email. The link may be
                    invalid or expired.
                </p>
                <button onClick={() => router.push("/register")}>
                    Back to Registration
                </button>
            </div>
        );
    }

    return null;
}
