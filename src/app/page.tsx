"use client";

import {
  AttributeTable,
  Modal,
  RaceSelector,
  RacialTraits,
} from "@/components";

export default function HomePage() {
  return (
    <div className="container mx-auto mt-24">
      <div>
        <div className="flex gap-8 justify-between items-center">
          <h1 className="text-3xl font-bold m-0 text-primary">
            D&D 5e Point-Buy Calculator
          </h1>
          <div className="flex justify-end gap-x-4">
            <Modal title="Basic Usage">
              <p>
                Use 27 points, as recommended by the Player&apos;s Handbook.
              </p>
            </Modal>
            <Modal title="About">
              <p>
                This point-buy calculator aims to cover several D&D 5e books. It
                is a work in progress. There is still data missing and not all
                functions are complete.
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
    </div>
  );
}
