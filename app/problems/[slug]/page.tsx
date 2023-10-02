import { prisma } from "@/lib/db";

export default async function SubChapterProblems({
    params,
}: {
    params: { slug: string };
}) {
    const subChapter = await prisma.subChapter.findUnique({
        where: {
            slug: params.slug,
        },
        include: {
            chapter: true,
        },
    });

    if (!subChapter) {
        return <div>404 not found</div>;
    }

    const problems = await prisma.problem.findMany({
        where: {
            subChapter: {
                slug: params.slug,
            },
        },
        include: {
            subChapter: true,
        },
    });
    return (
        <div>
            <h1 className="text-xl font-semibold">{subChapter.name}</h1>
            <p className="text-md text-gray-500 mb-4">
                {subChapter.chapter.name}
            </p>
        </div>
    );
}
