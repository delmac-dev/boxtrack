import { useGetStats } from "@/lib/query-hooks";
import { TabsContent } from "@radix-ui/react-tabs";


export default function Stats() {
    const { data: tabs, isLoading, isError } = useGetStats();

    return (
        <TabsContent value="stats" className="tab-content bg-red-600">
            this is stats page
        </TabsContent>
    )
}