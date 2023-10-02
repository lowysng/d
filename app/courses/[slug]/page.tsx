import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { ArrowLeftIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function CoursePage({
    params,
}: {
    params: { slug: string };
}) {
    const course = await prisma.course.findUnique({
        where: {
            slug: params.slug,
        },
    });

    if (!course) {
        return <div>404 not found</div>;
    }

    const chapters = await prisma.chapter.findMany({
        where: {
            course: {
                id: course?.id,
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

    return (
        <div>
            <Link href={`/courses`}>
                <div className="flex text-gray-400 items-center mb-8 hover:underline">
                    <ChevronLeftIcon className="mr-2" />
                    <p className="text-sm text-gray-400">Back to home</p>
                </div>
            </Link>
            <h1 className="text-xl font-semibold">{course.name}</h1>
            <p className="text-md text-gray-500 mb-4">{course.description}</p>
            {chapters.map((chapter) => {
                const subChapters = chapter.subChapters;
                subChapters.sort((a, b) => a.y_index - b.y_index);
                return (
                    <Card className="my-8">
                        <CardHeader>
                            <CardTitle>
                                {chapter.y_index + 1} {chapter.name}
                            </CardTitle>
                            <CardDescription>{course.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm">
                                {subChapters.map((subChapter) => (
                                    <Link href={`/problems/${subChapter.slug}`}>
                                        <li className="my-1">
                                            <span className="hover:underline cursor-pointer">
                                                {chapter.y_index + 1}.
                                                {subChapter.y_index + 1}{" "}
                                                {subChapter.name}
                                            </span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
