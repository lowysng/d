import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "AS and A Level Past Papers",
    description: "CAIE AS and A Level Past Papers",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <div className="bg-slate-50">
                    {children}
                    <Toaster />
                </div>
                {/* <div className="max-w-[540px] mx-auto my-8">{children}</div> */}
            </body>
        </html>
    );
}
