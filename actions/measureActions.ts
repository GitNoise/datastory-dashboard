"use server";

/*** TYPES AND INTERFACES ***/
export interface Measure {
  id: string;
  name: string;
  unit: "thousands" | "percent" | "years";
}

/*** ACTIONS ***/

// Prepared to get data from external source
export async function getMeasures(): Promise<Measure[] | null> {
  return [
    { id: "life_expectancy", name: "Life expectancy", unit: "years" },
    { id: "population", name: "Population", unit: "thousands" },
    { id: "net_migration_rate", name: "Net migration rate", unit: "percent" },
  ];
}
