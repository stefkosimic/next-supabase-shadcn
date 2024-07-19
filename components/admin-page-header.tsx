"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

import { Breadcrumb } from "./breadcrumb";
import { Icons } from "./icons";
import { navLinks } from "./nav-links";
import { Button, buttonVariants } from "./ui/button";

export const HeaderAdmin = ({
  ctaButton,
  breadCrumb,
}: {
  breadCrumb: any;
  ctaButton: any;
}) => {
  const pathname = usePathname();
  return (
    <header className="bg-background sticky top-0 z-30 flex w-full items-center border-b p-4">
      <div className="">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-full flex-col sm:w-1/2">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Icons.logo />
                <span className="sr-only">hello</span>
              </Link>
              {navLinks.map((link: any, index: number) => {
                if (link.action) {
                  return (
                    <div
                      key={index}
                      onClick={link.action}
                      className={cn(
                        "text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className={cn(
                        "text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2",

                        pathname === link.href ? "bg-muted text-foreground" : ""
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                }
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex w-full items-center justify-between">
        <Breadcrumb breadCrumb={breadCrumb} />
      </div>
      <div className="flex items-center gap-4">
        {ctaButton && (
          <>
            {ctaButton.href ? (
              <Link
                href={ctaButton.href}
                className={buttonVariants({ className: "whitespace-nowrap" })}
              >
                {ctaButton.label}
              </Link>
            ) : (
              <Button onClick={ctaButton.action} className="whitespace-nowrap">
                {ctaButton.label}
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
};
