import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";


export default function TabButton(props: {fnx: ()=>void, icon: LucideIcon}) {
    return (
        <button className={cn("group relative z-10 p-1.5 pt-0 bg-neutral-200 rounded-xl")} onClick={props.fnx}>
            <div className={cn("tab-item group-data-[state=active]:text-primary-foreground")}>
                {<props.icon className="size-5" />}
            </div>
        </button>
    )
}