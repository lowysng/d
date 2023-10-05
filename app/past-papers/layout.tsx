import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";

export default function PastPapersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen h-full">
            {/* <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle className="text-blue-900 font-semibold">
                    Looking for a personal tutor?
                </AlertTitle>
                <AlertDescription>
                    We offer online 1-1 tuitions from SGD 80/hr. Send us a
                    Whatsapp message at +6588425925 to find out more!
                </AlertDescription>
            </Alert> */}
            <div className="mx-auto max-w-4xl pt-8 pb-96 px-8">
                <h1 className="text-xl font-semibold text-blue-950">
                    AS and A Level Past Papers
                </h1>
                <p className="text-sm text-gray-600 mt-1 mb-4">
                    We have lots of past papers for you to practice on. Use the
                    filters below to find the papers you need!
                </p>
                {children}
            </div>
        </div>
    );
}
