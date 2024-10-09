import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        const user = await prisma.user.findFirst({
            where: { confirmationToken: token },
        });

        if (!user) {
            return res.status(404).json({ message: "Invalid token" });
        }

        if (user.isConfirmed) {
            return res.status(400).json({ message: "Email already confirmed" });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { isConfirmed: true, confirmationToken: null },
        });

        res.status(200).json({ message: "Email confirmed successfully" });
    } catch (error) {
        console.error("Confirmation error:", error);
        res.status(500).json({ message: "Error confirming email" });
    }
}
