"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import DatePicker from "./date-picker";

import { WorkSchema } from "@/app/lib/schema-definitions"
import { filterWorksByDate } from "@/app/lib/actions";

const DateFilterSchema = z.object({
  toDate: z.date(),
  fromDate: z.date(),
});

export function DynamicFilter({setData}: {setData: (data: z.infer<typeof WorkSchema>[]|[])=>void}) {
  // ...
  const form = useForm<z.infer<typeof DateFilterSchema>>({
    resolver: zodResolver(DateFilterSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof DateFilterSchema>) {
    const WorkSchemaTemp = WorkSchema.omit({vehicleId: true})
    const fetchedData = await filterWorksByDate(values.fromDate, values.toDate);
    const parsedFetchedData = fetchedData.map((eachData) => WorkSchemaTemp.parse(eachData));
    setData(parsedFetchedData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex justify-start gap-4 items-end">
        
        <FormField
          control={form.control}
          name="fromDate"
          render={({ field }) => (
            <DatePicker field={field} title="From" />
          )}
        />

        <FormField
          control={form.control}
          name="toDate"
          render={({ field }) => (
            <DatePicker field={field} title="To" />
          )}
        />

        <Button type="submit">Filter</Button>
      </form>
    </Form>
  );
}
