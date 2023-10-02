import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

async function getRevisionNote(slug: string) {
    const revisionNote = await prisma.revisionNote.findUnique({
        where: { slug },
    });
    console.log(revisionNote);
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
                    <Link href={`/${revisionNote.slug}/edit`}>
                        <Button variant="outline" size="sm">
                            Edit note
                        </Button>
                    </Link>
                </div>
                <p className="text-xl font-semibold py-4">
                    {revisionNote.title}
                </p>
                <Markdown
                    className="whitespace-pre-line"
                    components={{
                        h1: ({ node, ...props }) => (
                            <p
                                className="font-semibold text-blue-800"
                                {...props}
                            />
                        ),
                        p: ({ node, ...props }) => (
                            <p className="text-sm text-gray-800" {...props} />
                        ),
                    }}
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
