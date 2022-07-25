import axios from "axios";
import { createLilydleAnswer } from "./assaultlilyRdf";
import * as transform from "./transform";
import { SparqlReponse } from "./types";

// axiosのmock
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const sparqlResponse: SparqlReponse = {
  head: {
    vars: ["kana", "display", "class", "nameeng"],
  },
  results: {
    bindings: [
      {
        kana: {
          type: "literal",
          "xml:lang": "ja",
          value: "はつかのよう",
        },
        display: {
          type: "literal",
          "xml:lang": "ja",
          value: "初鹿野瑤",
        },
        class: {
          type: "uri",
          value:
            "https://luciadb.assaultlily.com/rdf/IRIs/lily_schema.ttl#Lily",
        },
        nameeng: {
          type: "literal",
          "xml:lang": "en",
          value: "Hatsukano Yo",
        },
      },
      {
        kana: {
          type: "literal",
          "xml:lang": "ja",
          value: "つぼいななほ",
        },
        display: {
          type: "literal",
          "xml:lang": "ja",
          value: "坪井七保",
        },
        class: {
          type: "uri",
          value:
            "https://luciadb.assaultlily.com/rdf/IRIs/lily_schema.ttl#Lily",
        },
        nameeng: {
          type: "literal",
          "xml:lang": "en",
          value: "Tsuboi Nanaho",
        },
      },
      {
        kana: {
          type: "literal",
          "xml:lang": "ja",
          value: "たざわつばき",
        },
        display: {
          type: "literal",
          "xml:lang": "ja",
          value: "田沢椿月",
        },
        class: {
          type: "uri",
          value:
            "https://luciadb.assaultlily.com/rdf/IRIs/lily_schema.ttl#Lily",
        },
        nameeng: {
          type: "literal",
          "xml:lang": "en",
          value: "Tazawa Tsubaki",
        },
      },
    ],
  },
};
mockedAxios.get.mockResolvedValue({ data: sparqlResponse });

// tranform(responseの変形処理)のmock
const transformSpy = jest.spyOn(transform, "transformSparqlResponse");
const lilydleAnswer = [
  {
    kana: "はつかのよう",
    display: "初鹿野瑤",
    lemonadeUrl: "https://luciadb.assaultlily.com/lily/Lily/Hatsukano-Yo",
  },
];
transformSpy.mockReturnValue(lilydleAnswer);

it("fetch assaultlily rdf and transform it", async () => {
  const result = await createLilydleAnswer();
  expect(transformSpy.mock.calls.length).toBe(1);
  expect(transformSpy.mock.calls[0][0]).toEqual(
    expect.arrayContaining(sparqlResponse.results.bindings)
  );
  expect(result).toEqual(expect.arrayContaining(lilydleAnswer));
});
