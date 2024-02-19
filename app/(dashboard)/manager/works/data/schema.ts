import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const Schema = z.object({
  id: z.string(),
  date: z.date(),
  billAmount: z.number(),
  depth: z.number(),
  location: z.string()
})

export type Invoice = z.infer<typeof Schema>
