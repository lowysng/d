"use client";

import { DataTable } from "@/components/ui/data-table";
import { PastPaper } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./table";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell } from "lucide-react";

export default function PastPapersPage() {
    // const searchParams = useSearchParams();
    // const searchParamsString = searchParams.toString();

    const [pastPapers, setPastPapers] = useState<PastPaper[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getPastPapers() {
            const res = await fetch(`/api/past-papers`, {
                method: "GET",
            });
            const data = await res.json();
            setPastPapers(data.data);
            setIsLoading(false);
        }

        getPastPapers();
    }, []);

    if (isLoading)
        return (
            <div className="flex justify-center items-center my-12">
                <svg
                    className="animate-spin h-4 w-4 mr-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
                </svg>
                <p className="text-sm">Loading...</p>
            </div>
        );

    return (
        <div>
            <div className="my-4">
                <Alert>
                    <Bell className="h-4 w-4" />
                    <AlertDescription className="text-gray-900 tracking-wide">
                        We only have past papers for three subjects:
                        Mathematics, Chemistry, and Physics, up from 2022 to
                        May/June 2023. We&apos;re working on adding more
                        subjects and more papers, so stay tuned!
                    </AlertDescription>
                </Alert>
            </div>
            <DataTable columns={columns} data={pastPapers} />
        </div>
    );
}
