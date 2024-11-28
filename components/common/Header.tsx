"use client";

import { HomeIcon, LogOut, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { parseNavigation } from "@/lib/utils";
import { NavigationProps } from "@/lib/types";
import Tab from "./tab";
import { signOut } from "next-auth/react";

export default function Header () {
    const leftPanel:NavigationProps[] = [
        { name: "HOME",link: "/", active: false, onLeft: true, onRight: false, icon: HomeIcon },
        { name: "A",link: "/groups/a", active: false, onLeft: false, onRight: false },
        { name: "B",link: "/groups/b", active: false, onLeft: false, onRight: false },
        { name: "C",link: "/groups/c", active: false, onLeft: false, onRight: false },
        { name: "D",link: "/groups/d", active: false, onLeft: false, onRight: false },
        { name: "E",link: "/groups/e", active: false, onLeft: false, onRight: false },
        { name: "STATS",link: "/stats", active: false, onLeft: false, onRight: true },
    ];
    const [content, setContent] = useState<NavigationProps[]>(leftPanel);
    const pathname = usePathname();

    useEffect(()=> {
        setContent(parseNavigation(pathname, leftPanel));
    }, [pathname]);

    return (
        <header className="w-full h-12 flex px-2 justify-between bg-neutral-200 items-end">
            {/* LeftPanel */}
            <div className="relative isolate h-10 flex">
                {content && content.slice(0,6).map((item, index) => <Tab key={index} {...item} />)}
                <Tab name="Add" icon={Plus} isButton fnx={() => console.log("hurray")} />
            </div>

            {/* Rightpanel */}
            <div className="relative isolate h-10 flex">
                <Tab name="Exit" icon={LogOut} isButton fnx={() => signOut({redirectTo: "/login"})} />
                <Tab {...content[6]} />
            </div>
        </header>
    )
}