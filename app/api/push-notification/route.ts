import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { message } = await req.json();

    try {
        await fetch("https://api.pushover.net/1/messages.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: process.env.PUSHOVER_API_KEY,
                user: process.env.PUSHOVER_USER_KEY,
                message,
            }),
        });
    } catch (e) {
        console.log("error", e);
    }

    return Response.json({ data: "ok" });
}
