"use client";

import { DataTable } from "@/components/ui/data-table";
import { PastPaper } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { columns } from "./table";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function PastPapersPage() {
    // const searchParams = useSearchParams();
    // const searchParamsString = searchParams.toString();

    const [pastPapers, setPastPapers] = useState<PastPaper[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [emailValidated, setEmailValidated] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        async function getPastPapers() {
            const res = await fetch(`/api/past-papers`, {
                method: "GET",
            });
            const data = await res.json();
            setPastPapers(data.data);
            setIsLoading(false);

            await fetch("/api/analytics", {
                method: "POST",
                body: JSON.stringify({
                    event: "page_view",
                    data: "/past-papers",
                }),
            });
        }

        getPastPapers();
    }, []);

    async function subscribe() {
        await fetch("/api/subscribe", {
            method: "POST",
            body: JSON.stringify({
                email,
            }),
        });
        await fetch("/api/analytics", {
            method: "POST",
            body: JSON.stringify({
                event: "subscribe",
                data: email,
            }),
        });
        setEmail("");
        toast({
            title: "Thanks for subscribing!",
            description:
                "We'll update you when we add more subjects and papers.",
        });
    }

    function validateEmail() {
        const regex = /\S+@\S+\.\S+/;
        setEmailValidated(regex.test(email));
    }

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
                        May/June 2023.
                    </AlertDescription>
                    <AlertDescription className="text-gray-900 tracking-wide">
                        We&apos;re working hard to add more subjects and more
                        papers! Interested? Enter you email address below and we
                        will notify you when we release new subjects and papers.
                    </AlertDescription>
                    <div className="my-4">
                        <p className="text-sm mb-2">Email address:</p>
                        <div className="flex">
                            <Input
                                type="email"
                                value={email}
                                className={`w-96 h-8 mr-4 ${
                                    email && !emailValidated && "border-red-500"
                                }`}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail();
                                }}
                            />
                            <Button
                                className="h-8 font-normal text-xs bg-blue-800 hover:bg-blue-900 hover:shadow-md"
                                disabled={!emailValidated}
                                onClick={() => subscribe()}
                            >
                                Notify me
                            </Button>
                        </div>
                        {email && !emailValidated && (
                            <p className="my-2 text-xs text-red-500">
                                Enter a valid email address.
                            </p>
                        )}
                    </div>
                </Alert>
            </div>
            <DataTable columns={columns} data={pastPapers} />
        </div>
    );
}
