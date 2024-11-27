import { HomeIcon } from "lucide-react";


export default function Header () {
    return (
        <header className="w-full h-14 border-b border-neutral-300 flex">
            <div className="px-10 h-full flex items-center justify-center">
                <a href="/" className="text-xl font-bold uppercase"><HomeIcon/></a>
            </div>
            <div className="flex-1 h-full flex items-center justify-start gap-14">
                <a href="/groups/a" className="text-lg font-medium">A</a>
                <a href="/groups/b" className="text-lg font-medium">B</a>
                <a href="/groups/c" className="text-lg font-medium">C</a>
            </div>
            <div className="px-10 h-full flex items-center justify-center">
                <a href="/stats" className="text-lg font-medium">Stats</a>
            </div>
        </header>
    )
}