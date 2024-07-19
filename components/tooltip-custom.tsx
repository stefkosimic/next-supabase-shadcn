import { ReactNode } from "react";

import {
  Tooltip as TooltipWrapper,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Tooltip({
  children,
  component,
  text,
}: {
  children: ReactNode;
  text?: string;
  component?: ReactNode;
}) {
  return (
    <TooltipProvider>
      <TooltipWrapper>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{component ? component : <p>{text}</p>}</TooltipContent>
      </TooltipWrapper>
    </TooltipProvider>
  );
}
