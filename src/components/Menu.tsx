"use client";

import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css"; // optional
import { LogOut, SettingsIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Button } from "./ui/button";
import authServices from "services/auth";
import Link from "next/link";

export default function Menu({
  children,
}: //   menuItems,
  {
    children: React.ReactNode;
    //   menuItems: MenuItems;
  }) {
  const [onLogout, setOnLogout] = useState(false);
  const handleLogout = () => {
    // setOnLogout(true);
    // authServices
    //   .logout()
    //   .then((res) => {
    //     setOnLogout(true);
    window.location.reload();
    // })
    // .catch((err) => setOnLogout(false));
  };

  return (
    <Tippy
      delay={[0, 500]}
      offset={[12, 12]}
      interactive
      arrow={true}
      hideOnClick={false}
      placement="bottom-end"
      render={(attrs) => (
        <div className="" tabIndex={-1} {...attrs}>
          <a className="" data-popper-arrow="">
            {/* <TopArrowIcon className="absolute -top-2 block h-2 w-6 text-white" /> */}
          </a>
          <ul className="min-w-[223px] rounded-md border bg-background py-2 font-semibold leading-[22px] shadow-[#0000001f_0px_4px_16px] ">
            <Dialog>
              <DialogTrigger asChild>
                <li className="cursor-pointer border-t p-0 hover:bg-muted">
                  <a className="flex items-center p-[10px_8px_10px_16px]">
                    <LogOut />
                    <span className="ml-[6px] text-[16px]">Đăng xuất</span>
                  </a>
                </li>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bạn muốn đăng xuất?</DialogTitle>
                  <Button onClick={handleLogout} disabled={onLogout}>
                    Xác nhận
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </ul>
        </div>
      )}
    >
      <div>{children}</div>
    </Tippy>
  );
}
