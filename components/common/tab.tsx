import { NavigationProps } from "@/lib/types";
import { cn } from "@/lib/utils";


export default function Tab(props:NavigationProps & { isButton?: boolean, fnx?: () => void }) {
    const { name, link="", active=false, onLeft=false, onRight=false, isButton, fnx} = props;

    return (
        <div 
            className={cn("relative z-0 p-1.5 pt-0 bg-neutral-700 rounded-t-xl", !active && "rounded-b-xl bg-neutral-200 z-10",
                !onLeft && active && "before:block before:content-[''] before:absolute before:w-4 before:h-4 before:bg-neutral-700 before:bottom-0 before:-left-4",
                !onRight && active && "after:block after:content-[''] after:absolute after:w-4 after:h-4 after:bg-neutral-700 after:bottom-0 after:-right-4",
            )}
        >
            {isButton ? 
                (<button className={cn("header-item", active && "text-primary-foreground")} onClick={fnx && fnx}>{props.icon? (<props.icon className="size-5" />) : name }</button>):
                (<a href={link} className={cn("header-item", active && "text-primary-foreground")}>{props.icon? (<props.icon className="size-5" />) : name }</a>)
            }
        </div>
    )
}