'use client'
import {
    ColumnDef,
} from "@tanstack/react-table"

import { DataTableToolbar } from "./data-table-toolbar"
import { useReactTableUtility } from "@/app/lib/util/use-react-table"
import { DataTable } from "@/app/components/data-table/data-table"
import { ReactElement } from "react"
import { cn } from "@/lib/utils"


interface DataTableProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | []
}

export default function DataTableWithToolbar<TData, TValue>({
    columns,
    data,
    className
}: DataTableProps<TData, TValue>) {

    const table = useReactTableUtility({ columns, data })
    return(
        <div className={cn("space-y-4", className)} >
            <DataTableToolbar table={table}/>
            <DataTable table={table} columns={columns} />
        </div>
    )

}