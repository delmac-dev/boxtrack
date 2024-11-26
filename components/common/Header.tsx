"use client";

import { HomeIcon } from "lucide-react";
import { Exit } from "./exit";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { parseNavigation } from "@/lib/utils";
import { NavigationProps } from "@/lib/types";

export default function Header () {
    const navLinks:NavigationProps[] = [
        { name: "home",link: "", active: false, onLeft: true, onRight: false },
    ];
    const [content, setContent] = useState<NavigationProps[]>([]);
    const pathname = usePathname();

    useEffect(()=> {
        setContent(parseNavigation(pathname, navLinks, true));
    }, [pathname]);

    return (
        <header className="w-full h-14 border-b border-neutral-300 flex px-4">
            {/* LeftPanel */}
            <div className="flex-1 h-full flex items-center justify-start gap-5">
                <a href="/" className="text-xl font-bold uppercase"><HomeIcon/></a>
                <a href="/groups/a" className="text-lg font-medium">A</a>
                <a href="/groups/b" className="text-lg font-medium">B</a>
                <a href="/groups/c" className="text-lg font-medium">C</a>
            </div>

            {/* Rightpanel */}
            <div className="h-full flex items-center justify-end gap-5">
                <Exit />
                <a href="/stats" className="text-lg font-medium">Stats</a>
            </div>
        </header>
    )
}