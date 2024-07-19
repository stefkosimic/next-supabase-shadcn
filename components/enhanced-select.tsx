import * as React from "react";
import { Plus } from "lucide-react";
import { FaPlus } from "react-icons/fa";

import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn, formatCurrency } from "@/lib/utils";

import { Label } from "./ui/label";

export function EnhancedSelect({
  options,
  selected,
  onChange,
  errorText,
  ctaButtonAction,
  placeholder,
  label,
}: any) {
  return (
    <div className="flex w-full flex-col pt-4">
      {label && <Label className="pb-3 font-bold">{label}</Label>}
      <SelectUI value={selected} onValueChange={onChange}>
        <SelectTrigger className="relative">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option: any, index: number) => (
            <SelectItem key={index} value={option.value} className="relative">
              <span>{option.label}</span>
              <span className="absolute right-10 top-2.5 flex h-5 items-center justify-center rounded-full bg-slate-500 p-1 text-xs text-white">
                {`${formatCurrency(option.price)}/m2`}
              </span>
            </SelectItem>
          ))}
          {ctaButtonAction && (
            <div
              onClick={() => {
                ctaButtonAction();
              }}
              className={cn(
                "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm bg-muted py-3 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              )}
            >
              <Plus size={16} /> <span>Add a new fee</span>
            </div>
          )}
        </SelectContent>
      </SelectUI>
      <p className="pt-1 font-semibold text-red-500">{errorText}</p>
    </div>
  );
}
