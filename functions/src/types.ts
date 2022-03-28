export type LilydleAnswer = {
  kana: string;
  lemonadeUrl: string;
  display: string;
};
type bindings = {
  type?: string;
  value: string;
  "xml:lang"?: string;
};
export type SparqlReponse = {
  head: unknown;
  results: {
    bindings: {
      kana?: bindings;
      display: bindings;
      class: bindings;
      nameeng: bindings;
    }[];
  };
};
