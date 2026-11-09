import "@/styles/globals.css";
import Providers from "./Providers";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Navbar } from "@/components/Navbar";
import { DEFAULT_LOCALE, htmlLang, isLocale, LOCALE_HEADER } from "@/i18n/locale";
import { buildJsonLd, buildMetadata } from "@/lib/seo";

function requestLocale() {
  const locale = headers().get(LOCALE_HEADER);
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function generateMetadata(): Metadata {
  return buildMetadata(requestLocale());
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = requestLocale();
  const jsonLd = buildJsonLd(locale);

  return (
    <html lang={htmlLang(locale)}>
      <body className="text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers initialLocale={locale}>
          <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14 print:max-w-none print:p-4">
            {children}
          </main>
          <Navbar />
        </Providers>
      </body>
    </html>
  );
}
