"use client"

import { Collections } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { CalendarClockIcon, CheckCircle2, CircleX, LucideIcon, Printer } from "lucide-react";
import { useTabContext } from "@/lib/custom-hooks";

// label startAt endAt boxTotal boxDone boxLeft status

const columns: ColumnDef<Collections>[] = [
    {
        id: "startAt",
        header: "Date Started",
        cell: ({row: {original}}) => {
            const { day, date} = formatDate(original.startAt)
            return (
                <div className="flex items-center space-x-3">
                    <div className="size-8 bg-secondary rounded-full flex-center">
                        <CalendarClockIcon className="size-4 text-dark/80" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-dark/80 text-left">{day}</h4>
                        <p className="text-xs font-normal text-dark text-left">{date}</p>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "label",
        header: "Collection",
        cell: ({row: {original}}) => {
            const {setActiveTab} = useTabContext();
            const label = original.label;

            return (
                <button className="font-medium" onClick={() => setActiveTab(label)}>
                    Group {label}
                </button>
        )}
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <div className="flex-center">
                <div className="px-2 py-1 rounded-full bg-secondary text-tertiary font-medium text-xs">
                    {row.getValue("status")}
                </div>
            </div>
        )
    },
    {
        id: "progress",
        header: "Progress",
        cell: ({row: { original}}) => (
            <div className="font-medium">
                {original.boxDone} of {original.boxTotal}
            </div>
        )
    },
    {
        id: "action",
        cell: () => (
            <div className="flex-center justify-start space-x-2">
                <ActionButton title="Print" icon={Printer} action={()=> console.log("print")} />
                <ActionButton title="Delete" icon={CircleX} action={()=> console.log("delete")} />
            </div>
        )
    },
]

const ActionButton = (props: {action: () => any, icon: LucideIcon, title: string}) => (
    <button className="px-2.5 py-1.5 rounded-full bg-tertiary text-primary font-medium text-xs flex-center space-x-1" onClick={props.action}>
        <props.icon className="size-4"/>
        <span>{props.title}</span>
    </button>
)

export default columns;