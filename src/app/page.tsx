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
  const titleLead = copy.title.slice(0, -copy.titleAccent.length);

  return (
    <>
      <header className="grid items-center gap-x-5 gap-y-3 sm:gap-y-4 lg:grid-cols-[minmax(0,1fr)_auto] print:hidden">
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-full border border-border text-base tracking-normal">
            ✧
          </span>
          {copy.ledgerLabel}
        </p>
        <h1 className="font-display text-[clamp(2.05rem,5.3vw,4.6rem)] leading-[1.08] tracking-tight sm:text-balance lg:col-span-2 lg:row-start-2">
          {titleLead}<span className="text-primary">{copy.titleAccent}</span>
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:col-start-2 lg:row-start-1 lg:justify-end">
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
                className="text-primary underline underline-offset-4"
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
