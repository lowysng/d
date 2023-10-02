import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "@radix-ui/react-icons";

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-slate-50 min-h-screen h-full">
            {/* <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Looking for a personal tutor?</AlertTitle>
                <AlertDescription>
                    We offer online 1-1 tuitions from SGD 80/hr. Send us a
                    Whatsapp message at +6588425925 to find out more!
                </AlertDescription>
            </Alert> */}
            <div className="max-w-[540px] mx-auto py-8">{children}</div>
        </div>
    );
}
