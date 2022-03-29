import { SparqlReponse, LilydleAnswer } from "./types";

export function katakanaToHiragana(str: string): string {
  return str.replace(/[\u30A1-\u30F6]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) - 0x60)
  );
}

export function transformSparqlResponse(
  sparqlBindings: SparqlReponse["results"]["bindings"]
): LilydleAnswer[] {
  const diacritics = /[\u0300-\u036F]/;
  const result = sparqlBindings.map((item) => {
    return {
      kana: katakanaToHiragana(
        item.kana
          ? item.kana.value
          : katakanaToHiragana(item.display.value.replace("・", ""))
      ),
      lemonadeUrl:
        "https://lemonade.lily.garden/" +
        item.class.value.split("#")[1].toLowerCase() +
        "/" +
        item.nameeng.value
          .replace(" ", "_")
          .replace("-", "_")
          .replace("ð", "d")
          .replace("æ", "ae")
          .replace("'s", "")
          .normalize("NFD")
          .replace(diacritics, ""), // remove accent
      display: item.display.value,
    };
  });
  return result;
}
