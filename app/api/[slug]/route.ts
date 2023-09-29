import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const found = await prisma.revisionNote.findUnique({
        where: {
            slug: params.slug,
        },
    });
    return NextResponse.json({ data: found ? found : null });
}

export async function PUT(req: NextRequest) {
    const { slug, title, content, subject } = await req.json();

    const updated = await prisma.revisionNote.update({
        where: {
            slug,
        },
        data: {
            slug,
            title,
            content,
            subject,
        },
    });

    revalidatePath(`/${slug}`);
    return NextResponse.json({ data: updated });
}
