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

import { ControllerRenderProps, FieldValues, FieldPath } from "react-hook-form";

interface dateProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>{
    field: ControllerRenderProps<TFieldValues, TName>
    title: string
}

const DatePicker = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({ field, title }: dateProps<TFieldValues, TName>) => {
    return (
        <FormItem className="flex flex-col">
            <FormLabel className="max-w-fit">{title}</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick invoice date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            {/* <FormDescription>
            Your date of birth is used to calculate your age.
          </FormDescription> */}
            <FormMessage />
        </FormItem>
    )
}


export default DatePicker