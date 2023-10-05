// import fs from "fs";
// import { prisma } from "@/lib/db";

export default async function Home() {
    // function parseFilename(filename: string) {
    //     console.log(">>> filename", filename);
    //     const [subjectCode, monthYear, _, numberVariant] = filename.split("_");
    //     const month = monthYear.slice(0, 1);
    //     const year = monthYear.slice(1);
    //     const number = numberVariant.slice(0, 1);
    //     const variant = numberVariant.slice(1, 2);

    //     const months: Record<string, string> = {
    //         m: "03",
    //         s: "06",
    //         w: "11",
    //     };

    //     const subjectCodes: Record<string, string> = {
    //         9709: "5d156b43-1b8e-4423-84c0-1aa8c10bf6f4",
    //         9701: "b8b2049a-e80c-48ec-8d0b-d629ae2ebc91",
    //         9702: "4f4133d0-ece2-4b2e-a2eb-61e1052f48b8",
    //     };

    //     return {
    //         number: Number(number),
    //         year: new Date(`20${year}-01-01`),
    //         month: new Date(`20${year}-${months[month]}-01`),
    //         variant: Number(variant),
    //         url: `/assets/past-papers/9701/${filename}`,
    //         markingSchemeUrl: `/assets/past-papers/9701/${filename.replace(
    //             "qp",
    //             "ms"
    //         )}`,
    //         subjectId: subjectCodes[subjectCode],
    //         isPublished: true,
    //     };
    // }

    // const files: string[] = fs.readdirSync("./public/assets/past-papers/9701");
    // const pdfs = files.filter((file) => file.endsWith(".pdf"));
    // const qps = pdfs.filter((pdf) => pdf.includes("_qp_"));

    // for (const qp of qps) {
    //     const exists = await prisma.pastPaper.findUnique({
    //         where: {
    //             url: `/assets/past-papers/9701/${qp}`,
    //         },
    //     });
    //     if (!exists) {
    //         const data = parseFilename(qp);
    //         await prisma.pastPaper.create({
    //             data,
    //         });
    //     }
    // }

    return <h1>home</h1>;
}
