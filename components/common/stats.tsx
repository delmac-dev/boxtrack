import { useGetStats } from "@/lib/query-hooks";
import { TabsContent } from "@radix-ui/react-tabs";


export default function Stats() {
    const { data: tabs, isLoading, isError } = useGetStats();

    return (
        <TabsContent value="stats" className="tab-content">
            this is stats page
        </TabsContent>
    )
}