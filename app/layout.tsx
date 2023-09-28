import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "monyet.io",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Alert>
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Looking for a personal tutor?</AlertTitle>
                    <AlertDescription>
                        We offer online 1-1 tuitions from SGD 80/hr. Send us a
                        Whatsapp message at +6588425925 to find out more!
                    </AlertDescription>
                </Alert>
                {children}
            </body>
        </html>
    );
}
