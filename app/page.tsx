import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/lib/db";
import { columns } from "./columns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

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
        <div className="mx-auto w-full max-w-[800px] flex flex-col items-left py-8 mb-24">
            <h1 className="text-lg py-4 font-semibold">
                A-Level Revision Notes
            </h1>
            <div>
                {/* {[
                    "Maths Pure 1",
                    "Maths Pure 3",
                    "Chemisty",
                    "Physics",
                    "Biology",
                ].map((subject) => (
                    <Badge
                        variant="outline"
                        className="mr-2 text-xs font-normal"
                    >
                        {subject}
                    </Badge>
                ))} */}
                <DataTable columns={columns} data={revisionNotes as any} />
            </div>
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
