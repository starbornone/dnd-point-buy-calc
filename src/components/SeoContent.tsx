"use client";

import { useMessages } from "@/context/LocaleContext";

export function SeoContent() {
  const copy = useMessages();

  return (
    <section
      aria-labelledby="seo-about-heading"
      className="mt-10 space-y-4 border-t border-border pt-8 print:hidden"
    >
      <h2 id="seo-about-heading" className="font-display text-2xl text-primary">
        {copy.aboutAndUsage}
      </h2>
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{copy.aboutBody}</p>
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{copy.pointBuyHelp}</p>
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
        {copy.standardArrayHelp}
      </p>
    </section>
  );
}
