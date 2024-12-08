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
        id: "startAt",
        header: "Date Started",
    },
    {
        id: "label",
        header: "Group",
    },
    {
        id: "boxTotal",
        header: "Total Boxes",
    },
    {
        id: "boxDone",
        header: "Boxes Done",
    },
    {
        id: "boxTotal",
        header: "Boxes Left",
    },
    {
        id: "status",
        header: "Status",
    },
    {
        id: "action",
    },
]

export default columns;