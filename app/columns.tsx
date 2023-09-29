"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRightIcon } from "@radix-ui/react-icons";
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
    subject: string;
};

export const columns: ColumnDef<RevisionNote>[] = [
    {
        accessorKey: "title",
        header: "Notes",
        cell: ({ row }) => {
            return (
                <Link
                    href={`/${row.original.slug}`}
                    className="hover:underline"
                >
                    {row.original.title}
                </Link>
            );
        },
    },
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => {
            return (
                <Badge
                    variant="outline"
                    className="font-normal text-neutral-600"
                >
                    {row.original.subject}
                </Badge>
            );
        },
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
                            <DropdownMenuItem>
                                View revision note
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/${row.original.slug}/edit`}>
                            <DropdownMenuItem>
                                Edit revision note
                            </DropdownMenuItem>
                        </Link>
                        {/* <DropdownMenuItem>Edit revision note</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
