"use client"

import { Collections } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { CalendarClockIcon, CheckCircle2, CircleX, LucideIcon, Printer } from "lucide-react";
import { useTabContext } from "@/lib/custom-hooks";
import { useRemoveCollection } from "@/lib/query-hooks";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

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
            const label = original.label;

            return (
                <p className="font-medium">
                    Group {label}
                </p>
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
        cell: ({row: { original }}) => {
            const { mutate: deleteCollection, isError, isSuccess, isPending } = useRemoveCollection();
            const toastIdRef = useRef<string | number | undefined>();

            useEffect(() => {
                if (isPending) { 
                  toastIdRef.current = toast.loading("Deleting Collection...");
                }
            
                if (isSuccess) {
                  if (toastIdRef.current) toast.dismiss(toastIdRef.current);
                  toast.success("Collection Deleted Successfully");
                  toastIdRef.current = undefined;
                }
            }, [isSuccess, isPending]);

            return (
                <div className="flex-center justify-start space-x-2">
                    <ActionButton title="Print" icon={Printer} fnx={()=> console.log("print")} />
                    <ActionButton title="Delete" icon={CircleX} fnx={()=> deleteCollection({id: original._id || ""})} />
                </div>
            )
        }
    },
]

const ActionButton = (props: {fnx: () => any, icon: LucideIcon, title: string}) => (
    <button className="px-2.5 py-1.5 rounded-full bg-tertiary text-primary font-medium text-xs flex-center space-x-1" onClick={props.fnx}>
        <props.icon className="size-4"/>
        <span>{props.title}</span>
    </button>
)

export default columns;