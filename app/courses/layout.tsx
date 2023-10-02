export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="max-w-[540px] mx-auto my-8">{children}</div>;
}
