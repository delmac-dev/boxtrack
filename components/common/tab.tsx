import {TabProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TabsTrigger } from "@radix-ui/react-tabs";


export default function Tab(props:TabProps & { fnx?: () => void }) {
    const { value, onLeft=false, onRight=false, fnx} = props;

    return (
        <TabsTrigger 
            value={value}
            disabled={!!fnx}
            className={cn("group relative z-10 p-1.5 pt-0 bg-neutral-200 rounded-xl data-[state=active]:rounded-b-none data-[state=active]:bg-neutral-700 data-[state=active]:z-0",
                !onLeft && "data-[state=active]:before:block data-[state=active]:before:content-[''] data-[state=active]:before:absolute data-[state=active]:before:size-4 data-[state=active]:before:bg-neutral-700 data-[state=active]:before:bottom-0 data-[state=active]:before:-left-4",
                !onRight && "data-[state=active]:after:block data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:size-4 data-[state=active]:after:bg-neutral-700 data-[state=active]:after:bottom-0 data-[state=active]:after:-right-4",
            )}
        >
            <div className={cn("tab-item group-data-[state=active]:text-primary-foreground")} onClick={fnx && fnx}>
                {props.icon? (<props.icon className="size-5" />) : value }
            </div>
        </TabsTrigger>
    )
}