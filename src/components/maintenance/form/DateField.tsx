
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import type { MaintenanceFormData } from "./types";

interface DateFieldProps {
  form: UseFormReturn<MaintenanceFormData>;
}

export function DateField({ form }: DateFieldProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <FormField
      control={form.control}
      name="scheduledDate"
      rules={{ required: "Scheduled date is required" }}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Scheduled Date</FormLabel>
          <div className="relative">
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
              onClick={(e) => {
                e.preventDefault();
                setShowCalendar(!showCalendar);
              }}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
            </Button>
            {showCalendar && (
              <div className="absolute top-[calc(100%+4px)] left-0 z-[9999] bg-white border rounded-md shadow-lg p-3">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setShowCalendar(false);
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
