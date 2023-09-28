import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { columns } from "./columns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

async function getRevisionNotes() {
    // await prisma.revisionNote.create({
    //     data: {
    //         title: "Inequalities on Graph",
    //         slug: "inequalities-on-graph",
    //         content: "# Inequalities on Graph",
    //     },
    // });
    const revisionNotes = await prisma.revisionNote.findMany();
    return revisionNotes;
}

async function RevisionNotes() {
    const revisionNotes = await getRevisionNotes();
    return (
        <div className="mx-auto w-screen flex flex-col items-center py-8 mb-24">
            <h1 className="text-lg py-4">
                A-Level Maths Pure 1 Revision Notes
            </h1>
            <DataTable columns={columns} data={revisionNotes as any} />
        </div>
    );
}

export default async function Home() {
    return (
        <div>
            <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Are you looking for a personal tutor?</AlertTitle>
                <AlertDescription>
                    We offer online 1-1 tuitions from SGD 80/hr. Send us a
                    Whatsapp message at +6588425925 to find out more!
                </AlertDescription>
            </Alert>
            <RevisionNotes />
        </div>
    );
}
