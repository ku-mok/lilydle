import MockDate from "mockdate";
import { generateWordleAnswer } from "./generateWordleAnswer";

it("generate another answer in another day", () => {
  const candidate = [
    {
      display: "初鹿野瑤",
      kana: "はつかのよう",
      lemonadeUrl: "https://lily.fvhp.net/lily/Lily/Hatsukano-Yo",
    },
    {
      kana: "ぶりゅーなく",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Brionac",
      display: "ブリューナク",
    },
    {
      kana: "じょわゆーず",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Joyeuse",
      display: "ジョワユーズ",
    },
    {
      kana: "まそれりっく",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Ma_Zu_Relic",
      display: "マソレリック",
    },
    {
      kana: "にょるにーる",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Njolnir",
      display: "ニョルニール",
    },
    {
      kana: "のーとぅんぐ",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Nothung",
      display: "ノートゥング",
    },
    {
      kana: "あろんだいと",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Aroundight",
      display: "アロンダイト",
    },
    {
      kana: "ふらがらっは",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Fragarach",
      display: "フラガラッハ",
    },
    {
      kana: "ゔぁんぴーる",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Vampire",
      display: "ヴァンピール",
    },
    {
      kana: "ぐらーしーざ",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Grásiða",
      display: "グラーシーザ",
    },
    {
      kana: "からどぼるぐ",
      lemonadeUrl: "https://lemonade.lily.garden/charm/Caladbolg",
      display: "カラドボルグ",
    },
    {
      kana: "ばしゃんどれ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Basa_Andre",
      display: "バシャンドレ",
    },
    {
      kana: "おれんつぁろ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Olentzaro",
      display: "オレンツァロ",
    },
    {
      kana: "がるちゃごり",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Galtzakgorri",
      display: "ガルチャゴリ",
    },
    {
      kana: "しゃらんちゃ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Xarrantxa",
      display: "シャランチャ",
    },
    {
      kana: "れぎんれいゔ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Reginleif",
      display: "レギンレイヴ",
    },
    {
      kana: "ろすゔぁいせ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Rossweisse",
      display: "ロスヴァイセ",
    },
    {
      kana: "げいらゔぉる",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Geiravör",
      display: "ゲイラヴォル",
    },
    {
      kana: "びゅるぎゃ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Byrgja",
      display: "ビュルギャ",
    },
  ];
  ("daily");

  MockDate.set(new Date(2020, 2, 7));
  const ans1 = generateWordleAnswer(candidate, "daily");
  MockDate.set(new Date(2020, 2, 8));
  const ans2 = generateWordleAnswer(candidate, "daily");
  console.log(ans1);
  console.log(ans2);
  expect(ans1).not.toEqual(ans2);
});

it("generate the same answer in the same day", () => {
  const candidate = [
    {
      display: "初鹿野瑤",
      kana: "はつかのよう",
      lemonadeUrl: "https://lily.fvhp.net/lily/Lily/Hatsukano-Yo",
    },
    {
      kana: "ばしゃんどれ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Basa_Andre",
      display: "バシャンドレ",
    },
    {
      kana: "おれんつぁろ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Olentzaro",
      display: "オレンツァロ",
    },
    {
      kana: "がるちゃごり",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Galtzakgorri",
      display: "ガルチャゴリ",
    },
    {
      kana: "しゃらんちゃ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Xarrantxa",
      display: "シャランチャ",
    },
    {
      kana: "れぎんれいゔ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Reginleif",
      display: "レギンレイヴ",
    },
    {
      kana: "ろすゔぁいせ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Rossweisse",
      display: "ロスヴァイセ",
    },
    {
      kana: "げいらゔぉる",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Geiravör",
      display: "ゲイラヴォル",
    },
    {
      kana: "びゅるぎゃ",
      lemonadeUrl: "https://lemonade.lily.garden/legion/Byrgja",
      display: "ビュルギャ",
    },
  ];
  ("daily");

  MockDate.set(new Date(2020, 1, 1));
  const ans1 = generateWordleAnswer(candidate, "daily");
  MockDate.set(new Date(2020, 1, 1));
  const ans2 = generateWordleAnswer(candidate, "daily");

  expect(ans1).toEqual(ans2);
});
