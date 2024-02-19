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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

import { FormType, FormSchema } from "./schema";
import { InvoiceSchema } from "@/app/lib/schema-definitions"

import { UseFormReturn } from "react-hook-form";

const schema = z.object({
  amount: z.coerce.number(),
  expense: z.enum([
    "DIESEL",
    "MAINTENANCE",
    "MANAGER_ACCOM",
    "STAFF_CREDIT",
    "RATION",
    "LPG_GAS",
    "MEDICAL",
    "PAYROLL",
    "MISC",
  ]),
});
type SelectInputType = {
  form: UseFormReturn<z.infer<typeof InvoiceSchema>>;
  values: string[];
  fieldName: string;
  label: string;
  placeholder: string;
  description: string;
};

function SelectInput({
  form,
  values,
  fieldName,
  label,
  placeholder,
  description,
}: SelectInputType) {
  return (
    <FormField
      control={form.control}
      name={fieldName as "expense" | "status"}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} name={fieldName}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent >
              {values.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <FormDescription>
          {description}

        </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SelectInput;
