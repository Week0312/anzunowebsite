import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.setHeader(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=604800`
        );

        return res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
