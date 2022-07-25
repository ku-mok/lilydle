import axios from "axios";
import { LilydleAnswer, SparqlReponse } from "./types";
import { transformSparqlResponse } from "./transform";

async function fetchAssaultLilyRdf(
  query: string
): Promise<SparqlReponse["results"]["bindings"]> {
  const endpoint = "https://luciadb.assaultlily.com/sparql";
  const queryHeader = `
  PREFIX schema: <http://schema.org/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX lily: <https://luciadb.assaultlily.com/rdf/IRIs/lily_schema.ttl#>
  `;

  const response = await axios.get<SparqlReponse>(endpoint, {
    params: {
      query: queryHeader + query,
      format: "json",
    },
  });
  return response.data.results.bindings;
}

export async function createLilydleAnswer(): Promise<LilydleAnswer[]> {
  const query = `SELECT ?kana ?display ?class ?nameeng
	WHERE {
  {
    VALUES ?class { lily:Lily lily:Teacher lily:Character }
    ?slug lily:nameKana ?kana ;
          schema:name ?display ;
          schema:name ?nameeng ;
          a ?class.
    FILTER(strlen(?kana)=6)
    FILTER(lang(?display)="ja")
    FILTER(lang(?nameeng)="en")
  }
  UNION
  {
    VALUES ?class { lily:Legion lily:Charm }
    ?slug schema:name ?display ;
          schema:name ?nameeng ;
          a ?class.
    FILTER(strlen(?display)=6)
    FILTER(lang(?display)="ja")
    FILTER(lang(?nameeng)="en")
  }
}`;
  const rdfResponse = await fetchAssaultLilyRdf(query);
  return transformSparqlResponse(rdfResponse);
}
