"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { WorkSchema } from "@/app/lib/schema-definitions"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import SelectInput from "./select-input";
import DatePicker from "../date-picker";
import { createWork } from "@/app/lib/actions";


export default function CreateWorkForm() {
 
  const form = useForm<z.infer<typeof WorkSchema>>({
    resolver: zodResolver(WorkSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof WorkSchema>) {
    const result = await createWork(values)
    console.log(result)
  }

  const expenseTypeArr = [
    "DIESEL",
    "MAINTENANCE",
    "MANAGER_ACCOM",
    "STAFF_CREDIT",
    "RATION",
    "LPG_GAS",
    "MEDICAL",
    "PAYROLL",
    "MISC",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  name="amount"
                  placeholder="Enter amount here"
                  type="number"
                  onChange={field.onChange}
                />
              </FormControl>
              {/* <FormDescription>Enter the fucking amount here.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <SelectInput
          form={form}
          values={expenseTypeArr}
          fieldName="expense"
          label="Expense"
          placeholder="Select expense type"
          description="select the expense type here"
        />
        <SelectInput
          form={form}
          values={["paid", "pending"]}
          fieldName="status"
          label="Payment status"
          placeholder="Choose status"
          description="select the Payment status here"
        />

        <DatePicker form={form} name="date" />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write invoice description here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          {/* <DialogClose asChild>
            
          </DialogClose> */}
          <Button type="submit" variant="secondary">
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
