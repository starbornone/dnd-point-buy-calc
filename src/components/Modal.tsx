"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="bg-primary text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        {title}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
          <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
          <div className="mt-4">{children}</div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
