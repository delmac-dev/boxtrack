import { useGetCollections } from "@/lib/query-hooks";
import * as Tab from "@radix-ui/react-tabs";

export default function Home() {
    const { data: collections, isLoading, isError } = useGetCollections();

    return (
        <Tab.Content value="home" className="tab-content flex-col">
            <div className="mx-auto w-full max-w-screen-xl flex items-start justify-between py-9">
                <h1 className="text-3xl capitalize font-extrabold text-dark/60">COLLECTIONS</h1>
            </div>
            <div className="mx-auto w-full max-w-screen-xl flex-1"></div>
        </Tab.Content>
    )
}