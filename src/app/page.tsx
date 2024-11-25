"use client";

import {
  AttributeTable,
  Modal,
  RaceSelector,
  RacialTraits,
} from "@/components";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
        <h1 className="text-3xl font-bold m-0 text-primary text-center md:text-left">
          D&D 5e Point-Buy Calculator
        </h1>
        <div className="flex justify-end gap-x-4">
          <Modal title="Basic Usage">
            <p>Use 27 points, as recommended by the Player&apos;s Handbook.</p>
          </Modal>
          <Modal title="About">
            <p>
              This point-buy calculator aims to cover several D&D 5e books. I
              haven&apos;t played D&D 5e properly in a while, so feel free to
              open an issue on{" "}
              <Link
                href="https://github.com/starbornone/seo-optimizer"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </Link>{" "}
              if you find any errors.
            </p>
          </Modal>
        </div>
      </div>

      <form className="mt-8" id="dnd5e-pbc">
        {/* <AdvancedOptions /> */}
        <RaceSelector />
        <AttributeTable />
        <RacialTraits />

        {/* <button
              type="button"
              className="bg-primary text-white mt-5 px-6 py-2 rounded"
              id="reset"
            >
              Reset
            </button> */}
      </form>
    </div>
  );
}
