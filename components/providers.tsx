"use client";

import { ModalContextProvider } from "@/providers/ModalContext";
import { ToastProvider } from "@/providers/toastProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { ThemeProvider } from "@/components/theme-provider";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ModalContextProvider>
        <ToastProvider>
          {children}
          <ProgressBar
            height="4px"
            color="#0f172a"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </ToastProvider>
      </ModalContextProvider>
    </ThemeProvider>
  );
}
