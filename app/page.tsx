import { prisma } from "@/utils/db";
import Link from "next/link";

async function getRevisionNotes() {
    const revisionNotes = await prisma.revisionNote.findMany();
    return revisionNotes;
}

function RevisionNote({ id }: { id: string }) {
    return (
        <div>
            <Link href={`/${id}`}>
                <p>Revision Note ({id})</p>
            </Link>
        </div>
    );
}

export default async function Home() {
    const revisionNotes = await getRevisionNotes();
    return (
        <div>
            {revisionNotes.map((revisionNote) => (
                <RevisionNote id={revisionNote.id} />
            ))}
        </div>
    );
}
