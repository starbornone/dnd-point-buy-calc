import "@/styles/globals.css";
import Providers from "./Providers";
import type { Metadata } from "next";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "D&D 5e Point-Buy Calculator",
  description:
    "Easily calculate your Dungeons & Dragons 5e character stats with our point buy calculator. Includes point costs, racial bonuses, total scores, modifiers, and a summary of traits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-foreground antialiased">
        <Providers>
          <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14 print:max-w-none print:p-4">
            {children}
          </main>
          <Navbar />
        </Providers>
      </body>
    </html>
  );
}
