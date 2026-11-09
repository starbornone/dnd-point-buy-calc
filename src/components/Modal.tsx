"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMessages } from "@/context/LocaleContext";

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, children }) => {
  const copy = useMessages();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary" className="min-h-11 px-2.5 text-sm sm:px-4 sm:text-base">
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>{title}</DialogTitle>
        <div className="flex min-h-0 flex-col gap-3 overflow-y-auto text-sm leading-relaxed sm:gap-4 sm:text-base [&>*]:shrink-0">
          {children}
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button type="button" className="min-h-11">{copy.close}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
