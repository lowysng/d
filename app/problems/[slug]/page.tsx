export const revalidate = 10;

import { prisma } from "@/lib/db";
import "katex/dist/katex.min.css";
import Problems from "@/components/Problems";
import Link from "next/link";
import { ArrowLeftIcon, ChevronLeftIcon } from "lucide-react";

export async function generateStaticParams() {
    const subChapters = await prisma.subChapter.findMany();
    return subChapters.map((subChapter) => ({
        slug: subChapter.slug,
    }));
}

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
            is_published: true,
        },
        include: {
            subChapter: true,
        },
        orderBy: {
            y_index: "asc",
        },
    });

    return (
        <div className="max-w-[800px]">
            <Link href={`/courses`}>
                <div className="flex text-gray-400 items-center mb-8 hover:underline">
                    <ChevronLeftIcon className="mr-2" />
                    <p className="text-sm text-gray-400">Back to courses</p>
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
            {problems.length > 0 ? (
                <Problems problems={problems} />
            ) : (
                <p className="text-sm italic">
                    We don't have practice problems for this part of the course
                    yet. Check back later!
                </p>
            )}
        </div>
    );
}
