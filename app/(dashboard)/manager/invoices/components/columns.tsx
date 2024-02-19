"use client";

import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
  Row,
} from "@tanstack/react-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
import { InvoiceSchema } from "@/app/lib/schema-definitions";
import { DataTableColumnHeader } from "../../../../components/data-table/data-table-column-header";
import { DateAfter } from "react-day-picker";
import { z } from "zod";

export const columns: ColumnDef<z.infer<typeof InvoiceSchema>>[] = [
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

  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  // expense type
  {
    accessorKey: "expense",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expense" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        <Badge variant="outline">{row.getValue("expense")}</Badge>
      </div>
    ),
    filterFn: (row, id, value) => {
      console.log(row.getValue(id));
      return value.includes(row.getValue(id));
    },
  },

  // amount
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
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
      // console.log(value)
      const { from, to } = value;
      //If one filter defined and date is null filter it
      if ((from || to) && !date) return false;
      if (from && !to) {
        return date.getTime() >= from.getTime();
      } else if (!from && to) {
        return date.getTime() <= to.getTime();
      } else if (from && to) {
        return (
          date.getTime() >= from.getTime() && date.getTime() <= to.getTime()
        );
      } else return true;

    },
  },

  //description
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },

  {
    id: "action",
    header: () => <span>Action</span>,
    cell: ({ row }) => {
      const rowDetails = row.original;
      const keyValueArray = Object.entries(rowDetails);

      return (
        <div className="flex flex-col gap-2 px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm">Details</Button>
            </SheetTrigger>
            <SheetContent className="md:max-w-[500px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Invoice Details</SheetTitle>
                {/* <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription> */}
              </SheetHeader>
              <div className="py-4">
                {keyValueArray.map((value, index) => (
                  <Card className="mb-2" key={index}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <span className="col-span-1">{`${value[0]}`}</span>
                        <span className="col-span-2">
                          {`${value[0] == "amount" ?
                            (new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "INR",
                            }).format(parseFloat(value[1] as string)))
                            :
                            value[1]
                            }`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                ))}
              </div>

              {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
            </SheetContent>
          </Sheet>
          <Button size="sm">Edit</Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
