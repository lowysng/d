"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export type RevisionNote = {
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    content: string;
    status: "draft" | "published";
};

export const columns: ColumnDef<RevisionNote>[] = [
    {
        accessorKey: "title",
        header: "Notes",
    },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         const statuses = { draft: "Draft", published: "Published" };
    //         return statuses[row.original.status];
    //     },
    // },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/${row.original.slug}`}>
                            <DropdownMenuItem>View notes</DropdownMenuItem>
                        </Link>
                        {/* <DropdownMenuItem>Edit revision note</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
