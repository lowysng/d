import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function CoursesPage() {
    const courses = await prisma.course.findMany({
        where: {
            isPublished: true,
        },
        include: {
            chapters: {
                include: {
                    subChapters: true,
                },
            },
        },
    });
    courses.forEach((course) => {
        course.chapters.sort((a, b) => a.y_index - b.y_index);
        course.chapters.forEach((chapter) => {
            chapter.subChapters.sort((a, b) => a.y_index - b.y_index);
        });
    });
    return (
        <div>
            <h1 className="text-xl font-semibold">Hello 👋</h1>
            <p className="text-sm text-gray-500 mt-2 mb-4">
                We have lots of A level problems for you to practice on. Select
                a course below to get started. Have fun!
            </p>
            {courses.map((course) => (
                <Card key={course.id} className="shadow-sm">
                    <div className="flex justify-between m-6">
                        <div>
                            <CardTitle className="mb-2">
                                {course.name}
                            </CardTitle>
                            <CardDescription>
                                {course.description}
                            </CardDescription>
                        </div>
                        <div>
                            <Link
                                href={`/problems/${course.chapters[0].subChapters[0].slug}`}
                            >
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full"
                                >
                                    View course
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <CardContent>
                        <div className="grid grid-cols-2">
                            {course.chapters.map((chapter) => (
                                <Link
                                    key={chapter.id}
                                    href={`/problems/${chapter.subChapters[0].slug}`}
                                >
                                    <p className="text-sm my-1 hover:underline">
                                        {chapter.y_index + 1} {chapter.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
