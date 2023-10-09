import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PastPaper, Subject } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

function postAnalyticsDownloadEvent(file: string) {
    fetch("/api/analytics", {
        method: "POST",
        body: JSON.stringify({
            event: "download",
            data: file,
        }),
    });
}

function pushNotification(file: string) {
    fetch("/api/push-notification", {
        method: "POST",
        body: JSON.stringify({
            message: `A user has downloaded the file: ${file}`,
        }),
    });
}

export const subjects = [
    {
        value: "Mathematics",
        label: "9709 Mathematics",
    },
    {
        value: "Physics",
        label: "9702 Physics",
    },
    {
        value: "Chemistry",
        label: "9701 Chemistry",
    },
    {
        value: "Biology",
        label: "9700 Biology",
    },
];

export const years = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" },
    { value: "2014", label: "2014" },
];

export const months = [
    { value: "10", label: "October/November" },
    { value: "5", label: "May/June" },
    { value: "2", label: "February/March" },
];

export const papers = [
    { value: "1", label: "Paper 1" },
    { value: "2", label: "Paper 2" },
    { value: "3", label: "Paper 3" },
    { value: "4", label: "Paper 4" },
    { value: "5", label: "Paper 5" },
    { value: "6", label: "Paper 6" },
];

export const variants = [
    { value: "1", label: "Variant 1" },
    { value: "2", label: "Variant 2" },
    { value: "3", label: "Variant 3" },
    { value: "4", label: "Variant 4" },
    { value: "5", label: "Variant 5" },
    { value: "6", label: "Variant 6" },
];

export const columns: ColumnDef<PastPaper>[] = [
    {
        id: "subject",
        accessorFn: (paper) => {
            const subject = (paper as any).subject as Subject;
            return subject.name;
        },
        header: "Subject",
        cell: ({ row }) => {
            const subject = (row.original as any).subject as Subject;
            const colors: Record<string, string> = {
                "9709": "border-blue-100 text-blue-900",
                "9702": "border-red-100 text-red-900",
                "9701": "border-green-100 text-green-900",
            };
            return (
                <Badge
                    variant="outline"
                    className={`font-normal text-xs rounded-sm py-0.5 ${
                        colors[subject.code]
                    }`}
                >
                    {subject.name}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "paperCode",
        accessorFn: (paper) => {
            const subject = (paper as any).subject as Subject;
            return `${subject.code}/${paper.number}${paper.variant}`;
        },
        header: "Paper Code",
    },
    {
        id: "examPeriod",
        accessorFn: (paper) => `${paper.month}-${paper.year}`,
        header: "Exam Period",
        cell: ({ row }) => {
            const map: { [key: number]: string } = {
                2: "February/March",
                5: "May/June",
                10: "October/November",
            };
            const month = map[new Date(row.original.month).getMonth()];
            const year = new Date(row.original.year).getFullYear();
            return `${month} ${year}`;
        },
    },
    {
        id: "download",
        cell: ({ row }) => {
            return (
                <div className="flex justify-end">
                    <Link href={row.original.url} target="_blank">
                        <Button
                            size="sm"
                            variant="secondary"
                            className="h-auto text-xs py-1 mr-2 hover:bg-blue-800 hover:text-white hover:shadow-md"
                            onClick={() => {
                                postAnalyticsDownloadEvent(row.original.url);
                                pushNotification(row.original.url);
                            }}
                        >
                            Question paper{" "}
                            <DownloadIcon className="h-3 w-3 ml-1" />
                        </Button>
                    </Link>
                    {
                        <Link
                            href={row.original.markingSchemeUrl}
                            target="_blank"
                        >
                            <Button
                                size="sm"
                                variant="secondary"
                                className="h-auto text-xs py-1 mr-2 hover:bg-blue-800 hover:text-white hover:shadow-md"
                                onClick={() => {
                                    postAnalyticsDownloadEvent(
                                        row.original.markingSchemeUrl
                                    );
                                    pushNotification(
                                        row.original.markingSchemeUrl
                                    );
                                }}
                            >
                                Marking scheme{" "}
                                <DownloadIcon className="h-3 w-3 ml-1" />
                            </Button>
                        </Link>
                    }
                </div>
            );
        },
    },
    {
        id: "year",
        accessorFn: (paper) => new Date(paper.year).getFullYear().toString(),
        enableHiding: true,
        filterFn: (row, id, value) => {
            return value.includes(
                new Date(row.original.year).getFullYear().toString()
            );
        },
    },
    {
        id: "month",
        accessorFn: (paper) => new Date(paper.month).getMonth().toString(),
        enableHiding: true,
        filterFn: (row, id, value) => {
            return value.includes(
                new Date(row.original.month).getMonth().toString()
            );
        },
    },
    {
        id: "paperNumber",
        accessorFn: (paper) => paper.number.toString(),
        enableHiding: true,
        filterFn: (row, id, value) => {
            return value.includes(row.original.number.toString());
        },
    },
    {
        id: "variant",
        accessorFn: (paper) => paper.variant.toString(),
        enableHiding: true,
        filterFn: (row, id, value) => {
            return value.includes(row.original.variant.toString());
        },
    },
];
