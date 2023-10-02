import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function ProblemsLayout({
    params,
    children,
}: {
    params: { slug: string };
    children: React.ReactNode;
}) {
    const subChapter = await prisma.subChapter.findUnique({
        where: {
            slug: params.slug,
        },
        include: {
            chapter: {
                include: {
                    course: true,
                },
            },
        },
    });

    if (!subChapter) {
        return <div>404 not found</div>;
    }

    const chapter = await prisma.chapter.findUnique({
        where: {
            id: subChapter?.chapter.id,
        },
        include: {
            subChapters: true,
        },
    });

    if (!chapter) {
        return <div>404 not found</div>;
    }

    chapter?.subChapters.sort((a, b) => a.y_index - b.y_index);

    return (
        <div className="flex">
            <div className="w-96 h-screen p-12">
                <div className="my-4">
                    <p className="font-semibold">{`${chapter.y_index + 1} ${
                        chapter.name
                    }`}</p>
                    {chapter.subChapters.map((subChapter) => (
                        <Link
                            href={`/problems/${subChapter.slug}`}
                            className="hover:underline"
                            key={subChapter.id}
                        >
                            <p className="text-sm">{`
                                ${chapter.y_index + 1}.${
                                subChapter.y_index + 1
                            } ${subChapter.name}`}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mx-4 my-8">{children}</div>
        </div>
    );
}
