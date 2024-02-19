"use server";

import { z } from "zod";
import { db } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ExpenseType } from "@prisma/client";
import {fetchInvoiceByDate, fetchWorksByDate } from "@/app/lib/data";
import { InvoiceSchema, WorkSchema } from "@/app/lib/schema-definitions"



// export async function createInvoice(formData: FormData) {

//   const {expense_type, employee_id, amount, status, description} = CreateInvoice.parse({
//     expense_type: formData.get("expense_type"),
//     employee_id: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//     description: formData.get("desc")
//   })

//   // Test it out:
//   console.log(`e_id: ${employee_id}`)

//   await db.invoice.create({
//     data: {
//       expense: expense_type,
//       employeeId: employee_id,
//       amount: amount,
//       status: status,
//       description: description
//     }
//   })

//   revalidatePath('/manager/invoices')
//   redirect('/manager/invoices')

// }

export async function createInvoice(formData: z.infer<typeof InvoiceSchema>) {
  const formDataValidated = InvoiceSchema.parse({
    ...formData
  });

  const returnRes = await db.invoice.create({
    data: formDataValidated
  })

  return returnRes
}

export async function createWork(formData: z.infer<typeof WorkSchema>) {
  const formDataValidated = WorkSchema.parse({
    ...formData
  });

  const returnRes = await db.work.create({
    data: formDataValidated
  })

  return returnRes
}

export async function filterInvoiceByDate(fromDate: Date, toDate: Date) {
  const fetchData = await fetchInvoiceByDate(fromDate, toDate);
  return fetchData;
}

export async function filterWorksByDate(fromDate: Date, toDate: Date) {
  const fetchData = await fetchWorksByDate(fromDate, toDate);
  return fetchData;
}

