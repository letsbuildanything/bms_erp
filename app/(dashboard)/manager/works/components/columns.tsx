"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { WorkSchema } from "@/app/lib/schema-definitions"
import { z } from 'zod'

import { DataTableColumnHeader } from "../../../../components/data-table/data-table-column-header"
import { DateAfter } from "react-day-picker"

export const columns: ColumnDef<z.infer<typeof WorkSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Invoice" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  // expense type
  // {
  //   accessorKey: "expense",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Expense" />
  //   ),
  //   cell: ({row}) => (
  //     <div className="w-[80px]">
  //       <Badge variant="outline">{row.getValue("expense")}</Badge>
  //     </div>
  //   ),
  //   filterFn: (row, id, value) => {
  //     console.log(row.getValue(id))
  //     return value.includes(row.getValue(id))
  //   },
  // },

  // amount
  {
    accessorKey: "billAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bill Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("billAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },

  //date
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    filterFn: (row, columnId, value) => {
      const date: Date = row.getValue(columnId);
      const { from, to } = value;
      //If one filter defined and date is null filter it
      if ((from || to) && !date) return false;
      if (from && !to) {
        return date.getTime() >= from.getTime()
      } else if (!from && to) {
        return date.getTime() <= to.getTime()
      } else if (from && to) {
        return date.getTime() >= from.getTime() && date.getTime() <= to.getTime()
      } else return true;
    }
  },

  //depth
  {
    accessorKey: "depth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Depth" />
    ),
  },

  //location
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    
  },

]
