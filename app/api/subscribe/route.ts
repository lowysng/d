import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    await prisma.user.create({
        data: {
            emailAddress: email,
        },
    });

    return NextResponse.json({ data: "ok" });
}
