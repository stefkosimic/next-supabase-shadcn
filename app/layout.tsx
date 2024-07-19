import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

import { Providers } from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";

import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers>
            <div className="grow">{children}</div>
            {process.env.NODE_ENV === "development" && <TailwindIndicator />}
          </Providers>
        </body>
      </html>
    </>
  );
}
