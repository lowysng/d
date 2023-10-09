import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { message } = await req.json();

    fetch("https://api.pushover.net/1/messages.json", {
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

    return Response.json({ data: "ok" });
}
