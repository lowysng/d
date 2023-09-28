import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { columns } from "./columns";

async function getRevisionNotes() {
    const revisionNotes = await prisma.revisionNote.findMany();
    return revisionNotes;
}

async function RevisionNotes() {
    const revisionNotes = await getRevisionNotes();
    return (
        <div className="m-auto h-screen w-screen flex flex-col justify-center items-center">
            <h1 className="text-lg py-4">
                ✏️ CIE A Levels Maths Pure 1 Revision Notes
            </h1>
            <DataTable columns={columns} data={revisionNotes as any} />
        </div>
    );
}

export default async function Home() {
    return <RevisionNotes />;
}
