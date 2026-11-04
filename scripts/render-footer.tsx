import { readFileSync, writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import FooterSection from "../components/ui/footer";

for (const [file, privacyPage] of [
  ["site/index.html", false],
  ["site/privacidade/index.html", true],
] as const) {
  const original = readFileSync(file, "utf8");
  const footer = /<footer(?:\s[^>]*)?>[\s\S]*?<\/footer>/;
  if (!footer.test(original)) throw new Error(`Rodapé não encontrado em ${file}`);
  const markup = renderToStaticMarkup(<FooterSection privacyPage={privacyPage} />);
  writeFileSync(file, original.replace(footer, () => markup));
}
