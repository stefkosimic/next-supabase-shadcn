import * as React from "react";

import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "./ui/label";

export function Select({
  options,
  selected,
  onChange,
  errorText,
  haveNone = false,
  disabled,
  placeholder,
  label,
}: any) {
  return (
    <div className="flex w-full flex-col pt-4">
      {label && <Label className="pb-3 font-bold">{label}</Label>}
      <SelectUI disabled={disabled} value={selected} onValueChange={onChange}>
        <SelectTrigger className="">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {haveNone && <SelectItem value={""}>None</SelectItem>}
          {options.map((option: any, index: number) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectUI>
      <p className="pt-1 font-semibold text-red-500">{errorText}</p>
    </div>
  );
}
