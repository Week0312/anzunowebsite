import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/lib/prisma";
import { sendMail } from "../../../src/lib/mailer";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        console.log("Request body:", req.body);
        const { email } = req.body;

        if (!email || typeof email !== "string") {
            return res.status(400).json({ message: "Valid email is required" });
        }

        console.log("Checking for existing user");
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email already registered" });
        }

        console.log("Generating confirmation token");
        const confirmationToken =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

        console.log("Creating pre-registered user");
        await prisma.user.create({
            data: {
                email,
                confirmationToken,
                isConfirmed: false,
            },
        });

        console.log("Sending confirmation email");
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!baseUrl) {
            throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
        }
        const confirmUrl = `${baseUrl}/register?token=${confirmationToken}`;
        await sendMail({
            to: email,
            subject: "Complete your registration",
            text: `Please complete your registration by clicking on the following link: ${confirmUrl}`,
            html: `
        <h1>Complete your registration</h1>
        <p>Please click the link below to complete your registration:</p>
        <a href="${confirmUrl}">${confirmUrl}</a>
      `,
        });

        console.log("Pre-registration successful");
        res.status(200).json({
            message:
                "Pre-registration successful. Please check your email to complete registration.",
        });
    } catch (error) {
        console.error("Pre-registration error:", error);
        res.status(500).json({
            message: "Error during pre-registration",
            error:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        });
    }
}
