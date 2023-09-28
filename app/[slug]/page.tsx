import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

async function getRevisionNote(slug: string) {
    const revisionNote = await prisma.revisionNote.findUnique({
        where: { slug },
    });
    return revisionNote;
}

export default async function RevisionNotePage({
    params,
}: {
    params: { slug: string };
}) {
    const revisionNote = await getRevisionNote(params.slug);
    if (revisionNote) {
        return (
            <div className="mx-auto w-full max-w-[800px] py-8 mb-24">
                <div className="flex justify-between">
                    <Link href="/" className="flex items-center">
                        <ArrowLeftIcon className="w-4 h-4 mr-1 text-neutral-500" />
                        <p className="text-sm hover:underline text-neutral-500">
                            Back to notes
                        </p>
                    </Link>
                    <Button variant="outline" size="sm">
                        Edit note
                    </Button>
                </div>
                <p className="text-xl font-semibold py-4">
                    {revisionNote.title}
                </p>
                <Markdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                >
                    {revisionNote.content}
                </Markdown>
                {/* <Link href={`/${revisionNote.id}/edit`}>
                    <Button>Edit</Button>
                </Link> */}
            </div>
        );
    } else {
        return <div>404 not found</div>;
    }
}
