import { useGetCollections } from "@/lib/query-hooks";
import { TabsContent } from "@radix-ui/react-tabs";

export default function Home() {
    // const { data: collections, isLoading, isError } = useGetCollections();

    return (
        <TabsContent value="home" className="tab-content">
            the home page 
        </TabsContent>
    )
}