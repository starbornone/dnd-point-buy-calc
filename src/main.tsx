import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import Providers from "@/Providers";
import { DEFAULT_LOCALE, htmlLang, readLocale } from "@/i18n/locale";
import { buildDocumentMeta, buildJsonLd } from "@/lib/seo";
import "@/styles/globals.css";

const initialLocale =
  typeof window === "undefined" ? DEFAULT_LOCALE : readLocale(window.location.search);
const meta = buildDocumentMeta(initialLocale);
const jsonLd = buildJsonLd(initialLocale);

document.documentElement.lang = htmlLang(initialLocale);
document.title = meta.title;

const description = document.querySelector('meta[name="description"]');
description?.setAttribute("content", meta.description);

const canonical = document.querySelector('link[rel="canonical"]');
canonical?.setAttribute("href", meta.canonical);

let jsonLdScript = document.getElementById("json-ld") as HTMLScriptElement | null;
if (!jsonLdScript) {
  jsonLdScript = document.createElement("script");
  jsonLdScript.id = "json-ld";
  jsonLdScript.type = "application/ld+json";
  document.head.appendChild(jsonLdScript);
}
jsonLdScript.textContent = JSON.stringify(jsonLd);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers initialLocale={initialLocale}>
      <App />
    </Providers>
  </StrictMode>
);
