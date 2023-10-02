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
            <h1 className="text-xl font-semibold">Select a course</h1>
            <p className="text-md text-gray-500 mb-4">
                Pick up where you left off
            </p>
            {courses.map((course) => (
                <Card
                    className="my-4 flex justify-between items-center"
                    key={course.id}
                >
                    <CardHeader>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link
                            href={`/problems/${course.chapters[0].subChapters[0].slug}`}
                        >
                            <Button variant="outline">View course</Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
