"use client";

import {
  CharacterForm,
  LanguageSelect,
  Modal,
  PointCostTable,
  PrintSheet,
} from "@/components";
import { useMessages } from "@/context/LocaleContext";
import Link from "next/link";

export default function HomePage() {
  const copy = useMessages();

  return (
    <>
      <header className="flex flex-col gap-4 border-b border-accent pb-5 sm:gap-5 sm:pb-6 lg:flex-row lg:items-end lg:justify-between print:hidden">
        <h1 className="text-3xl font-bold leading-tight sm:text-balance sm:text-4xl xl:text-[2.625rem]">
          {copy.title}
        </h1>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3 lg:justify-end">
          <LanguageSelect />
          <Modal title={copy.basicUsage}>
            <p>{copy.basicUsageBody}</p>
            <PointCostTable />
            <p>{copy.standardArrayHelp}</p>
          </Modal>
          <Modal title={copy.about}>
            <p>
              {copy.aboutLead}{" "}
              <Link
                href="https://github.com/starbornone/dnd-point-buy-calc"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </Link>{" "}
              {copy.aboutTrail}
            </p>
          </Modal>
        </div>
      </header>

      <CharacterForm />
      <div className="prose mx-auto hidden max-w-5xl print:block">
        <PrintSheet />
      </div>
    </>
  );
}
