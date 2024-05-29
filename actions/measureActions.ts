"use server";

/*** TYPES AND INTERFACES ***/
export interface Measure {
  id: string;
  name: string;
  unit: "thousands" | "percent" | "years";
}

/*** ACTIONS ***/

export async function getMeasures(): Promise<Measure[] | null> {
  // Prepared to get data from external source
  return [
    { id: "life_expectancy", name: "Life expectancy", unit: "years" },
    { id: "population", name: "Population", unit: "thousands" },
    { id: "net_migration_rate", name: "Net migration rate", unit: "percent" },
  ];
}
