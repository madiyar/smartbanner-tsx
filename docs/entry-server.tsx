import { renderToString } from "react-dom/server";
import pkg from "../package.json";
import App from "./app";
import { FAQ } from "./lib/api";

const SITE = "https://madiyar.github.io/smartbanner-tsx/";

/** Renders the page to HTML at build time, so crawlers and AI tools see the content. */
export function render(): string {
  return renderToString(<App />);
}

/** schema.org data for search engines, built from the same content as the page. */
export function structuredData(): object[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: "smartbanner-tsx",
      description: pkg.description,
      url: SITE,
      codeRepository: "https://github.com/madiyar/smartbanner-tsx",
      programmingLanguage: ["TypeScript", "React"],
      runtimePlatform: "Web browser",
      license: "https://opensource.org/licenses/MIT",
      keywords: pkg.keywords.join(", "),
      author: {
        "@type": "Person",
        name: "madiyar",
        url: "https://madiyar.dev",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
}
