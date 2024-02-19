'use client'
import {
    ColumnDef,
} from "@tanstack/react-table"

import { DataTableToolbar } from "./data-table-toolbar"
import { useReactTableUtility } from "@/app/lib/util/use-react-table"
import { DataTable } from "@/app/components/data-table/data-table"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | []
}

export default function DataTableWithToolbar<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const table = useReactTableUtility({ columns, data })
    return(
        <div className="space-y-4">
            <DataTableToolbar table={table}/>
            <DataTable table={table} columns={columns} />
        </div>
    )

}