"use client";

import { useMessages } from "@/context/LocaleContext";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, children }) => {
  const copy = useMessages();
  const [isOpen, setIsOpen] = useState(false);
  const titleId = `modal-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <>
      <button
        type="button"
        className="bg-primary text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        {title}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-800/75" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <DialogTitle id={titleId} className="text-xl font-bold">
              {title}
            </DialogTitle>
            <div className="mt-4">{children}</div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                {copy.close}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
