import "@/styles/globals.css";
import Providers from "./Providers";
import type { Metadata } from "next";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "D&D 5e Point-Buy Calculator",
  description:
    "A point buy calculator for D&D 5e including point cost, racial bonuses, total score, modifiers, total points, and a summary of all traits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased p-4">
        <Providers>
          <div className="hidden md:block">
            <Navbar />
          </div>
          <main className="prose mx-auto max-w-5xl mb-12">{children}</main>
          <div className="md:hidden block">
            <Navbar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
