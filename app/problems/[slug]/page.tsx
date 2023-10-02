import { prisma } from "@/lib/db";
import "katex/dist/katex.min.css";
import Problems from "@/components/Problems";
import Link from "next/link";
import { ArrowLeftIcon, ChevronLeftIcon } from "lucide-react";

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

    const problems = await prisma.problem.findMany({
        where: {
            subChapter: {
                slug: params.slug,
            },
        },
        include: {
            subChapter: true,
        },
        orderBy: {
            y_index: "asc",
        },
    });

    return (
        <div>
            <Link href={`/courses/${subChapter.chapter.course.slug}`}>
                <div className="flex text-gray-400 items-center mb-8 hover:underline">
                    <ChevronLeftIcon className="mr-2" />
                    <p className="text-sm text-gray-400">
                        Back to course chapters
                    </p>
                </div>
            </Link>
            <h1 className="text-xl font-semibold">{`${
                subChapter.chapter.y_index + 1
            }.${subChapter.y_index + 1} ${subChapter.name}`}</h1>

            {/* <Link href={`/courses/${subChapter.chapter.course.slug}`}> */}
            <p className="text-md text-gray-500 mb-8">
                {subChapter.chapter.course.name} &gt; {subChapter.chapter.name}
            </p>
            {/* </Link> */}
            <Problems problems={problems} />
        </div>
    );
}
