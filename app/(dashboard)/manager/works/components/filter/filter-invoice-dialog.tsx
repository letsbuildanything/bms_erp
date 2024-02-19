'use client'

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
import { WorkSchema } from "@/app/lib/schema-definitions"
import { DynamicFilter } from './dynamic-filter'
import DataTableWithToolbar from '../data-table-with-toolbar'
import { z } from 'zod'

// async function getInvoices() {
//   const data = await fetchInvoices();

//   return data;
// }

const FilterInvoiceDialogue = () => {

  // const invoices = await getInvoices();
  // const parsedInvoices = invoices.map((invoice) => Schema.parse(invoice));
  const [data, setData] = useState<z.infer<typeof WorkSchema>[] | []>([])
  console.log(data)

  return (
    <Dialog onOpenChange={(isOpen) => (!isOpen && data.length > 0 && setData([]))} >
      <DialogTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] max-h-[575px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advance Filter</DialogTitle>
          <DialogDescription>
            It is a dynamic filter.
          </DialogDescription>
        </DialogHeader>
        {/* Main content of filter dialogue */}
        <DynamicFilter setData={setData} />
        <DataTableWithToolbar data={data} columns={columns} />

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FilterInvoiceDialogue;