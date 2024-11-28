import { Collections } from "@/lib/types";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect } from "react";


export default function Group(props: Collections) {
    const { label } = props;

    return (
        <TabsContent  value={label} className="tab-content">
            group {label} content page
        </TabsContent>
    )
}