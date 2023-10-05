"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card, CardFooter } from "./ui/card";
import { Problem } from "@prisma/client";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

export default function Problems({ problems }: { problems: Problem[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(
        Number(searchParams.get("index")) || 1
    );
    const [showSolution, setShowSolution] = useState(false);
    const problem = problems[selectedIndex - 1];
    return (
        <div>
            <div className="flex my-8">
                {problems.map((_, index) => (
                    <div
                        className={`${
                            index === selectedIndex - 1
                                ? "bg-gray-600 text-white"
                                : ""
                        }
                        w-8 h-8 rounded-sm flex justify-center items-center                        
                        `}
                        key={index}
                        onClick={() => {
                            const searchParams = new URLSearchParams();
                            searchParams.set("index", String(index + 1));
                            router.replace(
                                pathname + "?" + searchParams.toString()
                            );
                            setSelectedIndex(index + 1);
                            setShowSolution(false);
                        }}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            {problem && (
                <Card className="mb-8 bg-slate-50 shadow-sm">
                    <Markdown
                        className="m-4 text-md"
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {problem.prompt}
                    </Markdown>
                    {!showSolution && (
                        <CardFooter>
                            <Button
                                onClick={() => setShowSolution(true)}
                                className="w-full"
                            >
                                Show solution
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            )}
            {showSolution && (
                <div>
                    <Markdown
                        className="m-4 mb-8"
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {problem?.solution}
                    </Markdown>
                    <div className="flex items-center text-gray-700">
                        <p className="text-xs">Is the solution helpful?</p>
                        <p className="hover:text-red-500">
                            <ThumbsDownIcon className="h-4 w-4 mx-2 cursor-pointer" />
                        </p>
                        <p className="hover:text-green-500">
                            <ThumbsUpIcon className="h-4 w-4  cursor-pointer" />
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
