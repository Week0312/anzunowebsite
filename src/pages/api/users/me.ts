import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as {
            userId: number;
        };

        const { username, email } = req.body;

        const user = await prisma.user.update({
            where: { id: decoded.userId },
            data: {
                username,
                email,
            },
            select: {
                id: true,
                email: true,
                username: true,
            },
        });

        return res.status(200).json(user);
    } catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
