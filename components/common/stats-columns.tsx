"use client"

import { Stats } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { StatsCells } from "./stats-cells";

// collections date boxDone boxLeft

export const columns: ColumnDef<Stats>[] = [
    {
        id: "date",
        header: "Date Started",
        cell: ({ row: { original } }) => (
        <StatsCells type="full_name" data={original} />
        )
    }
]