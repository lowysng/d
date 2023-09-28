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
    const revisionNotes = await prisma.revisionNote.findMany({
        orderBy: { title: "asc" },
    });
    // await prisma.revisionNote.update({
    //     where: { id: "7ec7874b-132e-4cd3-a104-26c49b867ff6" },
    //     data: {
    //         content:
    //             "# Expanding Brackets \n\n When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are $$ x = {-b pm sqrt{b^2-4ac} over 2a} $$",
    //     },
    // });
    return revisionNotes;
}

async function RevisionNotes() {
    const revisionNotes = await getRevisionNotes();
    return (
        <div className="mx-auto w-full max-w-[800px] flex flex-col items-left py-8 mb-24">
            <h1 className="text-lg font-semibold">A-Level Revision Notes</h1>
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
            <RevisionNotes />
        </div>
    );
}
