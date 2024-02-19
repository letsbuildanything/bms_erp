import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const Schema = z.object({
  id: z.string(),
  amount: z.coerce.number(),
  description: z.string(),
  date: z.date(),
  status: z.enum(["pending", "paid"]),
  expense: z.enum(['DIESEL', 'MAINTENANCE','MANAGER_ACCOM', 'STAFF_CREDIT', 'RATION', 'LPG_GAS', 'MEDICAL', 'PAYROLL', 'MISC'])
})

export type Invoice = z.infer<typeof Schema>
