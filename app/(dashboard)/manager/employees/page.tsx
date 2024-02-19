import React from 'react'
import { columns } from './components/column';
import { fetchEmployees } from '@/app/lib/data';
import { EmployeeSchema } from '@/app/lib/schema-definitions';
import DataTableWithToolbar from './components/data-table-with-toolbar';
import AddEmployee from './components/cards/add-employee';
import PastEmployees from './components/cards/past-employees-card';
import PaymentSlip from './components/cards/payment-slip-card';
import { Separator } from '@/components/ui/separator';


const Page = async() => {

  const employeesData = await fetchEmployees()
  const employeesDataValidated = employeesData.map(data => EmployeeSchema.omit({terminated: true}).parse(data))

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex mb-10">
        <div className="flex items-center gap-4">
          
            <AddEmployee />
            <Separator orientation = "vertical" className="h-1/2 max-h-10" />
            <PaymentSlip />
            <Separator orientation = "vertical" className="h-1/2 max-h-10" />
            <PastEmployees/>
          
        </div>
        <DataTableWithToolbar data={employeesDataValidated} columns={columns} />
      </div>
    </>
  );
}

export default Page