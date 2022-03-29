/* eslint-disable max-len */
import { katakanaToHiragana, transformSparqlResponse } from "./transform";
import { LilydleAnswer } from "./types";

it("convert katakana to Hiragaga", () => {
  expect(katakanaToHiragana("アイウエオ")).toBe("あいうえお");
  expect(katakanaToHiragana("アイウエお")).toBe("あいうえお");
  expect(katakanaToHiragana("ヴ")).toBe("ゔ");
});

type TestCase = {
  kana?: string;
  display: string;
  className: string;
  nameeng: string;
  kanaExpected: string;
  lemonadeUrlExpected: string;
  displayExpected: string;
};

test.each`
  kana              | display             | className       | nameeng             | kanaExpected        | displayExpected     | lemonadeUrlExpected
  ${"はつかのよう"} | ${"初鹿野瑤"}       | ${"Lily#lily"}  | ${"Hatsukano-Yo"}   | ${"はつかのよう"}   | ${"初鹿野瑤"}       | ${"https://lemonade.lily.garden/lily/Hatsukano_Yo"}
  ${undefined}      | ${"グングニル"}     | ${"Lily#charm"} | ${"Gungnir"}        | ${"ぐんぐにる"}     | ${"グングニル"}     | ${"https://lemonade.lily.garden/charm/Gungnir"}
  ${undefined}      | ${"トールハンマー"} | ${"Lily#charm"} | ${"Thor's Hammer"}  | ${"とーるはんまー"} | ${"トールハンマー"} | ${"https://lemonade.lily.garden/charm/Thor_Hammer"}
  ${undefined}      | ${"クラウ・ソラス"} | ${"Lily#charm"} | ${"Claíomh Solais"} | ${"くらうそらす"}   | ${"クラウ・ソラス"} | ${"https://lemonade.lily.garden/charm/Claiomh_Solais"}
`(
  "convert sparql response to lilydle answer",
  ({
    kana,
    display,
    className,
    nameeng,
    kanaExpected,
    displayExpected,
    lemonadeUrlExpected,
  }: TestCase) => {
    const result: LilydleAnswer = transformSparqlResponse([
      {
        kana: kana ? { value: kana } : undefined,
        display: { value: display },
        class: { value: className },
        nameeng: { value: nameeng },
      },
    ])[0];
    // 変換結果が一致している
    expect(result).toEqual({
      kana: kanaExpected,
      lemonadeUrl: lemonadeUrlExpected,
      display: displayExpected,
    });
  }
);
