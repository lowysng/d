"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const { toast } = useToast();

    const [id, setId] = useState("");
    const [slug, setSlug] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [subject, setSubject] = useState("");

    useEffect(() => {
        async function getRevisionNote(slug: string) {
            const res = await fetch(`/api/${slug}`, { method: "GET" });
            if (res.ok) {
                const data = await res.json();
                setId(data.data.id);
                setSlug(data.data.slug);
                setTitle(data.data.title);
                setContent(data.data.content);
                setSubject(data.data.subject);
            }
        }
        if (params.slug) {
            getRevisionNote(params.slug);
        }
    }, [params.slug]);

    async function updateRevisionNote({
        slug,
        title,
        content,
        subject,
    }: {
        slug: string;
        title: string;
        content: string;
        subject: string;
    }) {
        const res = await fetch(`/api/${slug}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slug,
                title,
                content,
                subject,
            }),
        });
        if (res.ok) {
            toast({
                title: "Success",
                description: "Revision note updated",
            });
        }
    }

    return (
        <div className="mx-auto w-full max-w-[800px] py-8 mb-24">
            <div className="flex justify-between">
                <Link href={`/${params.slug}`} className="flex items-center">
                    <ArrowLeftIcon className="w-4 h-4 mr-1 text-neutral-500" />
                    <p className="text-sm hover:underline text-neutral-500">
                        Back
                    </p>
                </Link>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        updateRevisionNote({
                            slug,
                            title,
                            content,
                            subject,
                        });
                    }}
                >
                    Save note
                </Button>
            </div>
            <h1 className="text-xl font-semibold py-4">Edit page</h1>
            <p className="text-sm mr-2">ID</p>
            <Input
                placeholder=""
                value={id}
                disabled={true}
                className="mt-2 mb-3"
            />
            <p className="text-sm mr-2">Slug</p>
            <Input
                placeholder="Slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                className="mt-2 mb-3"
            />
            <p className="text-sm mr-2">Title</p>
            <Input
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-2 mb-3"
            />
            <p className="text-sm mr-2">Subject</p>
            <Input
                placeholder="Subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="mt-2 mb-3"
            />
            <p className="text-sm mr-2">Content</p>
            <Textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="h-96 mt-2 mb-3"
            />
        </div>
    );
}
