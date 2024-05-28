"use server";

import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(
  "https://datastory-cloud-v2.stellate.sh"
);

/*** TYPES AND INTERFACES ***/

export type DataPoint = {
  value: number;
  year: number;
};

export type CountryData = {
  cohort: string;
  measure: string;
  data: DataPoint[];
};

export interface Country {
  id: string;
  name: string;
  iso2: string;
}

interface CountriesResponse {
  item: Array<{
    id: string;
    name: string;
    iso2: Array<{ value: string }>;
  }>;
}

interface CountryDataResponse {
  cube_cube_M6Lh5is0FtqUhZ: Array<{
    value: number;
    year: number;
  }>;
}

/*** ACTIONS ***/

export async function getCountries(): Promise<Country[] | null> {
  try {
    const query = gql`
      query Countries {
        item(where: { class_id: { _eq: "Country" } }) {
          id
          name: name(path: "en")
          iso2: statements(where: { property_id: { _eq: "iso2" } }) {
            value: postgres_varchar
          }
        }
      }
    `;

    const response = await graphQLClient.request<CountriesResponse>(query);

    return response.item.map((d) => ({
      id: d.id,
      name: d.name,
      iso2: d.iso2[0].value,
    }));
  } catch (error) {
    console.error("Failed to get countries:", error);
    return null;
  }
}

export async function getCountry(
  id: string,
  measure: string = "life_expectancy"
): Promise<CountryData | null> {
  try {
    const query = gql`
      query CubeData($countryId: String!, $measure: String!) {
        cube_cube_M6Lh5is0FtqUhZ(
          where: { country: { _eq: $countryId }, measure: { _eq: $measure } }
        ) {
          value
          year
        }
      }
    `;

    const variables = { countryId: id, measure };

    const response = await graphQLClient.request<CountryDataResponse>(
      query,
      variables
    );

    return {
      cohort: id,
      measure: "life_expectancy",
      data: response.cube_cube_M6Lh5is0FtqUhZ ?? [],
    };
  } catch (error) {
    console.error("Failed to get country data:", error);
    return null;
  }
}
