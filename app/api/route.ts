import f from "@/lib/ai";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const problems = await prisma.problem.findMany({
        include: {
            subChapter: true,
        },
    });
    const subChapters = await prisma.subChapter.findMany({
        include: {
            chapter: true,
        },
        orderBy: [{ chapter: { y_index: "asc" } }, { y_index: "asc" }],
    });

    return Response.json({ data: { problems, subChapters } });
}

export async function POST(req: NextRequest) {
    const parsed = await req.json();

    if (parsed.confirm) {
        const created = await prisma.problem.create({
            data: {
                prompt: parsed.prompt,
                solution: parsed.solution,
                subChapterId: parsed.subChapterId,
                y_index: parsed.y_index,
                is_published: true,
            },
        });
        return NextResponse.json({ data: created });
    } else if (parsed.fill_solution) {
        const res = await f(parsed.prompt);
        parsed.solution = res;
        return NextResponse.json({ data: parsed });
    }
}
