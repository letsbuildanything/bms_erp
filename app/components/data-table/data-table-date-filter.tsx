"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Column } from "@tanstack/react-table";

interface DataTableDateFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  placeHolder: string;
  datePickerIndex: number;
}

export function DataTableDateFilter<TData, TValue>({
  column,
  placeHolder,
  datePickerIndex,
}: DataTableDateFilterProps<TData, TValue>) {
  const [date, setDate] = React.useState<Date>();
  const selectedValues = column?.getFilterValue() as (Date | undefined)[] || [];
  
  if(date && selectedValues.length==0)
    setDate(undefined)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeHolder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate(e);
            // const filterValues = Array.from(selectedValues)
            if (selectedValues.length < 2) {
              if (datePickerIndex == 0 && e) {
                selectedValues[datePickerIndex] = e;
                selectedValues[datePickerIndex + 1] = undefined;
              } else {
                selectedValues[datePickerIndex] = e;
                selectedValues[datePickerIndex - 1] = undefined;
              }
              column?.setFilterValue(selectedValues);
            } else {
              selectedValues[datePickerIndex] = e;
              column?.setFilterValue(selectedValues);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
