"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  name: string;
  defaultValue?: string | Date | null;
}

export default function DateTimePicker({ name, defaultValue }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined,
  );

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900 text-left flex items-center justify-between"
          >
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="text-slate-500">Select Date</span>
            )}

            <CalendarIcon className="h-4 w-4" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>
        </PopoverContent>
      </Popover>

      <input type="hidden" name={name} value={date ? date.toISOString() : ""} />
    </>
  );
}
