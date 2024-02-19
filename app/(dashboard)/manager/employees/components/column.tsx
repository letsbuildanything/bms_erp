"use client";

import {
    ColumnDef,
    flexRender,
    Table as ReactTable,
    Row,
} from "@tanstack/react-table";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EmployeeSchema } from "@/app/lib/schema-definitions";
import { DataTableColumnHeader } from "../../../../components/data-table/data-table-column-header";
import { z } from "zod";

// type schema = z.infer<typeof EmployeeSchema>

export const columns: ColumnDef<z.infer<typeof EmployeeSchema>>[] = [
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

    //   {
    //     accessorKey: "id",
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Invoice" />
    //     ),
    //     cell: ({ row }) => <div className="w-[80px] truncate">{row.getValue("id")}</div>,
    //     enableSorting: false,
    //     enableHiding: false,
    //   },

    // full name
    {
        id: "fullName",
        accessorKey: "fullName",
        header: ({ column}) => (<DataTableColumnHeader column={column} title="Full Name" />),
        cell: ({ row }) => <span>{`${row.original.firstName} ${row.original.lastName}`}</span>,
        filterFn: (row, id, value) => {
            const { firstName, lastName } = row.original
            const fullName = `${firstName} ${lastName}`.toLowerCase();
            return fullName.includes(value.toLowerCase())
        },
        enableSorting: true
    },

    //role
    {
        accessorKey: "role",
        header: ({ column }) => (
            // replace it with faceted values options
            <span>Role</span>
        ),
    },

    //contact
    {
        accessorKey: "contact",
        header: "Contact",
    },

    //profile
    {
        accessorKey: "profile",
        header: "Profile",
        // define cell, it will contain Profile button with update and delete action.

    }


];
