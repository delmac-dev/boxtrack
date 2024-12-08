import { useGetCollections } from "@/lib/query-hooks";
import * as Tab from "@radix-ui/react-tabs";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import columns from "@/components/common/home-columns";
import { Collections } from "@/lib/types";

export default function Home() {
    const { data: collections, isLoading, isError } = useGetCollections();

    const table = useReactTable<Collections>({ 
        data: collections || [], 
        columns, 
        getCoreRowModel: getCoreRowModel(),
    });
    
    const headerGroup = table.getHeaderGroups();
    const tableRows = table.getRowModel().rows;
    const hasRows = table.getRowModel().rows?.length;

    return (
        <Tab.Content value="home" className="tab-content flex-col">
            <div className="mx-auto w-full max-w-screen-xl flex items-start justify-between py-9">
                <h1 className="text-3xl capitalize font-extrabold text-dark/60">COLLECTIONS</h1>
            </div>
            <div className="mx-auto w-full max-w-screen-xl flex-1 bg-green-500">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                        {headerGroup.map(hg => (
                            <tr  key={hg.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                {hg.headers.map(h => (
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                                        {h.isPlaceholder ? null : flexRender( h.column.columnDef.header, h.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {tableRows.map((r) => (
                            <tr key={r.id}>
                                {r.getAllCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Tab.Content>
    )
}