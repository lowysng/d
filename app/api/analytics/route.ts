import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { event, data } = await req.json();

    await prisma.analytics.create({
        data: {
            event,
            data,
        },
    });

    return Response.json({ data: "ok" });
}
