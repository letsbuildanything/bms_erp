import { Metadata } from "next";

import { columns } from "./components/columns";
import DataTableWithToolbar from "./components/data-table-with-toolbar"

import { fetchInvoices } from "@/app/lib/data";
import { InvoiceSchema } from "@/app/lib/schema-definitions"
import CreateInvoice from "./components/forms/create-invoice";
import FilterInvoiceDialogue from "./components/filter/filter-invoice-dialog";
import { useReactTableUtility} from "@/app/lib/util/use-react-table"
import {Foo} from '../../../lib/util/foo-fn'


export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getInvoices() {
  const data = await fetchInvoices();

  return data;
}


export default async function TaskPage() {
  const InvoiceSchemaTemp = InvoiceSchema.omit({managerId: true, vehicleId: true, employeeId: true, imgUrl: true})
  const invoices = await getInvoices();
  const parsedInvoices = invoices.map((invoice) => InvoiceSchemaTemp.parse(invoice));
  

  return (
    <>
      
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <FilterInvoiceDialogue />
            <CreateInvoice />
          </div>
        </div>
        <DataTableWithToolbar data={parsedInvoices} columns={columns} />
      </div>
    </>
  );
}
