import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import Link from "next/link";

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
            <div>
                <p>id: {revisionNote.id}</p>
                <p>title: {revisionNote.title}</p>
                <p>slug: {revisionNote.slug}</p>
                <p>content: {revisionNote.content}</p>
                <Link href={`/${revisionNote.id}/edit`}>
                    <Button>Edit</Button>
                </Link>
            </div>
        );
    } else {
        return <div>404 not found</div>;
    }
}
