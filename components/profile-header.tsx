"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BsLayers } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi2";
import { IoMdCheckboxOutline } from "react-icons/io";
import { RiArrowLeftFill } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

const tabs = [
  {
    value: "info",
    label: "Profiel",
    icon: HiOutlineUser,
  },
  {
    value: "samples",
    label: "Kleurstalen",
    icon: BsLayers,
  },
  {
    value: "bestellingen",
    label: "Bestellingen",
    icon: IoMdCheckboxOutline,
  },
  {
    value: "logout",
    label: "logout",
    icon: RiLogoutBoxRLine,
  },
];

export default function ProfileHeader() {
  const [isLoading, setIsLoading] = useState(false);
  const [samples, setSamples] = useState<any>([]);
  const searchParams = useSearchParams();

  return (
    <>
      <header className="sticky left-0 top-0 z-40 w-full border-b bg-white/90 p-6 text-sm backdrop-blur-sm dark:bg-slate-800/90">
        <div className="flex items-center justify-between ">
          <div className="sm:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Icons.logo />
            </Link>
          </div>
          <div className=" items-center sm:flex sm:gap-4 ">
            <p className="text-md text-secondary mr-2 font-semibold">
              Your samples:
            </p>
            <div className="flex hover:cursor-pointer">
              {samples.map((sample) => (
                <div className="">
                  <Image
                    width={15}
                    height={15}
                    className="bg-secondary h-8 w-8 rounded-full border border-white"
                    src={sample?.variant?.featured_image?.publicUrl}
                    alt="Floor patern picture"
                  />
                </div>
              ))}
              {/* <div className="mr-[-60%] h-6 w-6 rounded-full border border-white bg-secondary"></div>
							<div className="mr-[-60%] h-6 w-6 rounded-full border border-white bg-secondary"></div>
							<div className="mr-[-60%] h-6 w-6 rounded-full border border-white bg-secondary"></div> */}
            </div>
          </div>

          <Button className="mr-6 hidden sm:block" variant={"primary"}>
            <span>
              <RiArrowLeftFill />
            </span>
            Terug naar winkel{" "}
          </Button>
          {/* <div className="sm:hidden"><NavSidebar /></div> */}
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="sticky top-[101px] z-40 mx-auto grid grid-cols-4 justify-center gap-4 divide-x bg-white/90 p-6 text-sm backdrop-blur-sm sm:hidden">
        {tabs.map((tab) => (
          <div className="flex justify-center">
            <Link
              className="text-muted-foreground"
              href={`/profiel/?tab=${tab.value}`}
            >
              {tab.icon({
                size: 24,
                color: searchParams.get("tab") === tab.value ? "black" : "gray",
              })}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
