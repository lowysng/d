import { prisma } from "@/utils/db";
import Link from "next/link";

async function getRevisionNote(id: string) {
    const revisionNote = await prisma.revisionNote.findUnique({
        where: { id },
    });
    return revisionNote;
}

export default async function RevisionNotePage({
    params,
}: {
    params: { id: string };
}) {
    const revisionNote = await getRevisionNote(params.id);
    if (revisionNote) {
        return (
            <div>
                Revision note page ({revisionNote.id})
                <Link href={`/${revisionNote.id}/edit`}>
                    <div>
                        <button>edit</button>
                    </div>
                </Link>
            </div>
        );
    } else {
        return <div>404 not found</div>;
    }
}
