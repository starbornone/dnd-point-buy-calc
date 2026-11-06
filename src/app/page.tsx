"use client";

import {
  AttributeTable,
  BuildControls,
  LanguageSelect,
  Modal,
  PointCostTable,
  PrintSheet,
  RaceSelector,
  RacialTraits,
} from "@/components";
import { useMessages } from "@/context/LocaleContext";
import Link from "next/link";

export default function HomePage() {
  const copy = useMessages();

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-center print:hidden">
        <h1 className="text-3xl font-bold m-0 text-primary text-center md:text-left">
          {copy.title}
        </h1>
        <div className="flex flex-wrap justify-end items-center gap-4">
          <LanguageSelect />
          <Modal title={copy.basicUsage}>
            <p>{copy.basicUsageBody}</p>
            <PointCostTable />
            <p className="mt-4">{copy.standardArrayHelp}</p>
          </Modal>
          <Modal title={copy.about}>
            <p>
              {copy.aboutLead}{" "}
              <Link
                href="https://github.com/starbornone/DnD-Point-Buy-Calc"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </Link>{" "}
              {copy.aboutTrail}
            </p>
          </Modal>
        </div>
      </div>

      <form
        className="mt-8 print:hidden"
        id="dnd5e-pbc"
        onSubmit={(event) => event.preventDefault()}
      >
        <RaceSelector />
        <BuildControls />
        <AttributeTable />
        <RacialTraits />
      </form>
      <PrintSheet />
    </div>
  );
}
