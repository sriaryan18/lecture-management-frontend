import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex items-center gap-2 ">
            <Image src="/logo.jpg" alt="Logo" width={30} height={30} className="rounded-full" />
            <h1 className="text-xl font-bold ">Learning Management System</h1>
        </div>
    );
}