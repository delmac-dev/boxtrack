import { useGetStats } from "@/lib/query-hooks";
import { TabsContent } from "@radix-ui/react-tabs";


export default function Stats() {
    const { data: stabs, isLoading, isError } = useGetStats();

    return (
        <TabsContent value="stats" className="tab-content flex-col">
            <div className="mx-auto w-full max-w-screen-xl flex items-start justify-between py-9">
                <h1 className="text-3xl capitalize font-extrabold text-dark/60">STATS</h1>
            </div>
            <div className="mx-auto w-full max-w-screen-xl flex-1"></div>
        </TabsContent>
    )
}