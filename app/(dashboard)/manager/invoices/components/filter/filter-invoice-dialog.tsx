'use client'

import { z } from "zod"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { columns } from "../columns"
import { fetchInvoices } from "@/app/lib/data"
import { InvoiceSchema } from '@/app/lib/schema-definitions'
import { DynamicFilter } from './dynamic-filter'
import DataTableWithToolbar from '../data-table-with-toolbar'
import Cards from "./cards"
import { Separator } from "@/components/ui/separator"

// async function getInvoices() {
//   const data = await fetchInvoices();

//   return data;
// }

const FilterInvoiceDialogue = () => {

  // const invoices = await getInvoices();
  // const parsedInvoices = invoices.map((invoice) => Schema.parse(invoice));
  const [data, setData] = useState<z.infer<typeof InvoiceSchema>[] | []>([])
  console.log(data)

  const totalSumValue = data.reduce((sum, item) => sum + item.amount, 0);
  const totalSumValueINR = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(totalSumValue)

  return (
    <Dialog onOpenChange={(isOpen) => (!isOpen && data.length > 0 && setData([]))} >
      <DialogTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] max-h-[575px] overflow-y-auto">
        <DialogHeader>
          
        </DialogHeader>
        {/* Main content of filter dialogue */}
        <DynamicFilter setData={setData} />

        <div className="flex gap-6">
          <Cards title="Total Invoices" value={data.length} />
          <Separator orientation="vertical" />
          <Cards title="Total Expenses" value={totalSumValueINR} />
        </div>

        <Separator className="mt-1 mb-8"/>

        <DataTableWithToolbar data={data} columns={columns} />

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FilterInvoiceDialogue;