import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { username, password, token } = req.body;

        if (!username || !password || !token) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Find user by confirmation token
        const user = await prisma.user.findFirst({
            where: { confirmationToken: token },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired token" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user with username and password, and mark as confirmed
        await prisma.user.update({
            where: { id: user.id },
            data: {
                username,
                password: hashedPassword,
                isConfirmed: true,
                confirmationToken: null,
            },
        });

        res.status(200).json({
            message: "Registration completed successfully",
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error completing registration" });
    }
}
