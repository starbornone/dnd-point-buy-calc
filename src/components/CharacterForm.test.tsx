// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readLocale } from "@/i18n/locale";
import Providers from "@/Providers";
import { CharacterForm } from "./CharacterForm";

const query = () => new URLSearchParams(window.location.search);

const renderCalculator = (search: string) => {
  window.history.replaceState(null, "", `/${search}`);
  render(
    <Providers initialLocale={readLocale(search)}>
      <CharacterForm />
    </Providers>
  );
};

const uploadBuild = (contents: string) => {
  const file = new File([contents], "character.json", { type: "application/json" });
  fireEvent.change(screen.getByLabelText("Import character"), { target: { files: [file] } });
};

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "/");
  Reflect.deleteProperty(navigator, "clipboard");
  Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
});

describe("CharacterForm and BuildSync", () => {
  it("copies a share link with the current scores, origin, and language", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    renderCalculator("?rules=2024&species=elf&lineage=Wood+Elf&lang=zh");

    fireEvent.change(screen.getByRole("spinbutton", { name: "力量 基础值" }), { target: { value: "15" } });
    fireEvent.click(screen.getByRole("button", { name: "复制链接" }));

    expect(await screen.findByText("链接已复制到剪贴板！")).toBeTruthy();
    expect(writeText).toHaveBeenCalledWith(
      `${window.location.origin}/?rules=2024&species=elf&lineage=Wood+Elf&str=15&lang=zh`
    );
  });

  it("imports a legacy JSON build and updates the form and URL", async () => {
    renderCalculator("?rules=2024&background=Farmer&str=13");
    uploadBuild(JSON.stringify({ version: 1, race: "dwarf", variant: "Hill Dwarf", attributes: { strength: 15 }, budget: 30 }));

    const buildTools = within(screen.getByRole("region", { name: "Build tools" }));
    expect((await buildTools.findByText("Successfully imported!")).getAttribute("role")).toBe("status");
    expect(screen.getByRole("combobox", { name: "Rules edition" })).toHaveProperty("value", "2014");
    expect(screen.getByRole("combobox", { name: "Select Race" })).toHaveProperty("value", "dwarf");
    expect(screen.getByRole("spinbutton", { name: "Strength score" })).toHaveProperty("value", "15");
    expect(screen.getByRole("spinbutton", { name: "Point budget" })).toHaveProperty("value", "30");
    expect(Object.fromEntries(query())).toEqual({ race: "dwarf", variant: "Hill Dwarf", str: "15", budget: "30" });
  });

  it.each([
    ["malformed JSON", "{", "Invalid JSON format."],
    ["an empty version 1 build", '{"version":1,"attributes":{}}', "That file is not a point-buy build."],
  ])("keeps the current build when importing %s", async (_name, contents, feedback) => {
    renderCalculator("?rules=2024&background=Farmer&str=15");
    const previousQuery = window.location.search;
    uploadBuild(contents);

    expect(await screen.findByText(feedback)).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Background" })).toHaveProperty("value", "Farmer");
    expect(screen.getByRole("spinbutton", { name: "Strength score" })).toHaveProperty("value", "15");
    expect(window.location.search).toBe(previousQuery);
  });

  it("resets the build and restores the previous build and URL on Undo", () => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
    renderCalculator("?rules=2024&background=Farmer&str=15&budget=30");

    fireEvent.click(screen.getByRole("button", { name: "Reset all scores and character settings" }));
    expect(screen.getByRole("combobox", { name: "Background" })).toHaveProperty("value", "");
    expect(screen.getByRole("spinbutton", { name: "Strength score" })).toHaveProperty("value", "8");
    expect(Object.fromEntries(query())).toEqual({ rules: "2024" });

    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(screen.getByText("Previous build restored.")).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Background" })).toHaveProperty("value", "Farmer");
    expect(screen.getByRole("spinbutton", { name: "Strength score" })).toHaveProperty("value", "15");
    expect(Object.fromEntries(query())).toEqual({ rules: "2024", background: "Farmer", str: "15", budget: "30" });
  });

  it("syncs only the active edition's choices and retains shared scores on a round trip", () => {
    renderCalculator("?rules=2024&species=elf&background=Farmer&str=15");
    const edition = screen.getByRole("combobox", { name: "Rules edition" });
    fireEvent.change(edition, { target: { value: "2014" } });
    const race = screen.getByRole("combobox", { name: "Select Race" });
    fireEvent.change(race, { target: { value: "dwarf" } });
    expect(Object.fromEntries(query())).toEqual({ race: "dwarf", str: "15" });

    fireEvent.change(edition, { target: { value: "2024" } });
    expect(screen.getByRole("combobox", { name: "Background" })).toHaveProperty("value", "Farmer");
    expect(Object.fromEntries(query())).toEqual({ rules: "2024", species: "elf", background: "Farmer", str: "15" });

    fireEvent.change(edition, { target: { value: "2014" } });
    expect(screen.getByRole("combobox", { name: "Select Race" })).toHaveProperty("value", "dwarf");
    expect(screen.getByRole("spinbutton", { name: "Strength score" })).toHaveProperty("value", "15");
    expect(Object.fromEntries(query())).toEqual({ race: "dwarf", str: "15" });
  });
});
