
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DisposalDatePickerProps {
  date?: Date;
  onDateChange: (date?: Date) => void;
}

export function DisposalDatePicker({ date, onDateChange }: DisposalDatePickerProps) {
  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
        onClick={(e) => {
          e.preventDefault();
          const calendarElement = document.getElementById('disposal-calendar');
          if (calendarElement) {
            calendarElement.style.display = calendarElement.style.display === 'none' ? 'block' : 'none';
          }
        }}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : "Pick a date"}
      </Button>
      <div
        id="disposal-calendar"
        className="absolute top-[calc(100%+4px)] left-0 z-[9999] bg-white border rounded-md shadow-lg p-3"
        style={{ display: 'none' }}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            onDateChange(newDate);
            const calendarElement = document.getElementById('disposal-calendar');
            if (calendarElement) {
              calendarElement.style.display = 'none';
            }
          }}
          initialFocus
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </div>
    </div>
  );
}
