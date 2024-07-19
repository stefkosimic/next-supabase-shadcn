"use client";

import * as React from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

export function DateRangePicker({ label, placeholder, date, setDate }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex w-full flex-col">
          {label && <Label className="pb-3 text-sm font-bold">{label}</Label>}
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start border-none bg-muted text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <div className="flex flex-col">
                  <span>{format(date.from, "LLL dd, y")} - </span>
                  <span>{format(date.to, "LLL dd, y")}</span>
                </div>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder || "Select date"}</span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
