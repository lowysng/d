import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const subjectSlugs = req.nextUrl.searchParams.getAll("subject");

    // await prisma.pastPaper.create({
    //     data: {
    //         year: new Date("2022-01-01"),
    //         month: new Date("2022-03-01"),
    //         subject: {
    //             connect: {
    //                 slug: "mathematics",
    //             },
    //         },
    //         paper: "2",
    //         variant: "2",
    //         url: "/assets/past-papers/9709_m22_qp_22.pdf",
    //         isPublished: true,
    //     },
    // });

    const pastPapers = await prisma.pastPaper.findMany({
        include: {
            subject: true,
        },
        where: {
            subject:
                subjectSlugs.length > 0
                    ? {
                          slug: {
                              in: subjectSlugs,
                          },
                      }
                    : undefined,
        },
        orderBy: [
            {
                year: "desc",
            },
            {
                month: "desc",
            },
            {
                number: "asc",
            },
            {
                variant: "asc",
            },
            {
                subject: {
                    code: "asc",
                },
            },
        ],
    });

    return Response.json({ data: pastPapers });
}
