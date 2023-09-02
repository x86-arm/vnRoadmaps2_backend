"use client";

import * as React from "react";
import { Globe2, Check } from "lucide-react";
import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { CheckboxItem, ItemIndicator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const LanguageList = [
  {
    name: "English",
    locale: "en",
  },
  {
    name: "Tiếng Việt",
    locale: "vi",
  },
];

export default function LanguageChange({ locale }: { locale: string }) {
  const path = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe2 className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Language Change</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LanguageList.map((item, index) => (
          <CheckboxItem
            key={index}
            className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            checked={locale == item.locale}
          >
            <Link locale={item.locale} href={path}>
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <ItemIndicator>
                  <Check className="h-4 w-4" />
                </ItemIndicator>
              </span>
              {item.name}
            </Link>
          </CheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
