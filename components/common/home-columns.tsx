"use client"

import { Collections } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { HomeCells } from "./home-cells";

// label startAt endAt boxTotal boxDone boxLeft status

const columns: ColumnDef<Collections>[] = [
    // {
    //     id: "date",
    //     header: "Date Started",
    //     cell: ({ row: { original } }) => (
    //         <HomeCells type="full_name" data={original} />
    //     )
    // },
    {
        accessorKey: "startAt",
        header: "Date Started",
    },
    {
        accessorKey: "label",
        header: "Group",
    },
    {
        accessorKey: "boxTotal",
        header: "Total Boxes",
    },
    {
        accessorKey: "boxDone",
        header: "Boxes Done",
    },
    {
        accessorKey: "boxLeft",
        header: "Boxes Left",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "action",
    },
]

export default columns;