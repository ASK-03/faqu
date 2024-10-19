"use client";

import { Sheet, SheetClose } from "../ui/sheet";
import React, { useEffect, useMemo, useState } from "react";
import { SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  id: string;
  defaultOpen?: boolean;
};

const sidebarOptions = [
  {
    text: "Dashboard",
    href: "/${userId}/dashboard",
  },
  {
    text: "Talk To SOMU",
    href: "/${userId}/somu",
  },
  {
    text: "Rewards",
    href: "/${userId}/rewards",
  },
];

const MenuOptions = ({ id, defaultOpen }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;
  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden flex"
      >
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={cn(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6 pt-[6rem]",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <div className="">
          <ul className="space-y-2">
            {sidebarOptions.map((item, index) => (
              <li
                key={index}
                className="hover:bg-primary hover:text-primary-foreground px-4 py-1 rounded-md transition-all transition-duration-500"
              >
                <SheetClose asChild>
                  <Link
                    href={item.href.replace("${userId}", id)}
                    className="block h-full"
                  >
                    {item.text}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
