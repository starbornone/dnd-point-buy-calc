import type { MetadataRoute } from "next";
import { messages } from "@/i18n/messages";

export default function manifest(): MetadataRoute.Manifest {
  const copy = messages.en;

  return {
    name: copy.title,
    short_name: "Point Buy",
    description: copy.description,
    start_url: "/",
    display: "standalone",
    background_color: "#1a1612",
    theme_color: "#c4a574",
    lang: "en",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
