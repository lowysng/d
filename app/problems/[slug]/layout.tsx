import { Separator } from "@/components/ui/separator";
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

    const chapters = await prisma.chapter.findMany({
        where: {
            course: {
                id: subChapter?.chapter.course.id,
            },
        },
        include: {
            subChapters: true,
            course: true,
        },
        orderBy: {
            y_index: "asc",
        },
    });

    chapters.forEach((chapter) =>
        chapter.subChapters.sort((a, b) => a.y_index - b.y_index)
    );

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
            <div className="w-96 h-full px-8 bg-slate-50">
                <div className="my-4">
                    <p className="text-xs mb-4 text-slate-500">
                        Course overview
                    </p>
                    {chapters.map((chapter) => (
                        <div className="mb-8" key={chapter.id}>
                            <p className="font-semibold text-lg mb-2">{`${
                                chapter.y_index + 1
                            } ${chapter.name}`}</p>
                            {chapter.subChapters.map((subChapter) => (
                                <Link
                                    href={`/problems/${subChapter.slug}`}
                                    className="hover:underline"
                                    key={subChapter.id}
                                >
                                    <p className="text-sm py-1">{`
                                ${chapter.y_index + 1}.${
                                        subChapter.y_index + 1
                                    } ${subChapter.name}`}</p>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Separator orientation="vertical" />
            </div>
            <div className="mx-12 my-8 w-[660px]">{children}</div>
        </div>
    );
}
