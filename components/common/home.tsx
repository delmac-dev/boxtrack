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
                <h1 className="text-3xl capitalize font-extrabold text-dark/60 tracking-tight">COLLECTIONS</h1>
            </div>
            <div className="overflow-hidden mx-auto w-full rounded-2xl max-w-screen-xl bg-tertiary/5 p-3">
                <table>
                    <thead>
                        {headerGroup.map(hg => (
                            <tr key={hg.id}>
                                {hg.headers.map(h => (
                                    <th key={h.id}>
                                        {h.isPlaceholder ? null : flexRender( h.column.columnDef.header, h.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {tableRows.map(r => (
                            <tr key={r.id}>
                                {r.getAllCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Tab.Content>
    )
}