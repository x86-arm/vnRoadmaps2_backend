import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  children?: React.ReactNode;
}

export default function Modal(props: Props) {
  React.useEffect(() => {
    props.isOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [props.isOpen]);

  return (
    <Dialog.Root
      open={props.isOpen}
      onOpenChange={(isOpen: boolean) => props.setIsOpen(isOpen)}
    >
      <Dialog.Overlay>
        <Dialog.Close>
          <div className="fixed inset-0 z-[1040] bg-black/50" />
        </Dialog.Close>
      </Dialog.Overlay>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {props.isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 z-[1050] flex h-full w-screen items-center justify-center"
            >
              <div className="relative m-auto h-fit max-h-[693px] min-w-[100px] rounded-lg bg-background dark:bg-background">
                <header className="flex h-16 items-center justify-between border-b px-4">
                  <h4>{props.title}</h4>
                  <div className="z-[1] flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[50%] bg-black/10 dark:bg-white/10">
                    <Dialog.Close>
                      <X className="h-[25px] w-[25px]" />
                    </Dialog.Close>
                  </div>
                </header>
                {props.children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
