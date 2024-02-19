import { Metadata } from "next";

import { columns } from "./components/columns";
import DataTableWithToolbar from "./components/data-table-with-toolbar"

import { fetchWorks } from "@/app/lib/data";
import { WorkSchema } from "@/app/lib/schema-definitions"
import CreateWorks from "./components/create-works";
import FilterInvoiceDialogue from "./components/filter/filter-invoice-dialog";




export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getWorks() {
  const data = await fetchWorks();

  return data;
}


export default async function TaskPage() {
  const WorkSchemaTemp = WorkSchema.omit({vehicleId: true})
  const works = await getWorks();
  const parsedWorks = works.map((invoice) => WorkSchemaTemp.parse(invoice));
  

  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        /> */}
      </div>
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
            <CreateWorks />
          </div>
        </div>
        <DataTableWithToolbar data={parsedWorks} columns={columns} />
      </div>
    </>
  );
}
