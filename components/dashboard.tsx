"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Badge } from "@chakra-ui/react";
import DropDown from "./dropDown";
import { Country, CountryData, getCountry } from "../actions/countryActions";
import Table from "./table";
import Chart from "./chart";
import Svg from "./svg";
import Line from "./line";
import Axis from "./axis";
import Area from "./area";

export default function Dashboard({
  countries,
}: {
  countries: Array<Country>;
}) {
  const [id, setId] = useState<string>();
  const [countryData, setCountryData] = useState<CountryData | null>(null);

  const handleCountriesChange = (id: string) => {
    setId(id);
  };

  useEffect(() => {
    async function getData(id: string) {
      const data = await getCountry(id);
      setCountryData(data);
    }

    if (id) {
      getData(id);
    }
  }, [id]);

  return (
    <>
      <div className="my-2">
        <DropDown
          onChange={handleCountriesChange}
          data={countries.map((c) => ({ id: c.id, name: c.name }))}
        />
      </div>

      {countryData ? (
        <>
          <Card backgroundColor={"#fff"}>
            <CardBody>
              <Badge>{countryData.cohort}</Badge>
              <Badge> {countryData.measure}</Badge>

              <Chart
                data={countryData.data}
                x={"year"}
                y={"value"}
                height={300}
                padding={22}
              >
                <Svg>
                  <g transform={`translate(${0},${-22})`}>
                    <Axis orientation="bottom" xOrY="x" />
                  </g>

                  <g transform={`translate(${0},${22})`}>
                    <Axis orientation="left" xOrY="y" />
                  </g>
                  <Line />
                  <Area />
                </Svg>
              </Chart>
              <br />
              <Table data={countryData.data} />
            </CardBody>
          </Card>
        </>
      ) : (
        <Card backgroundColor={"#fff"}>
          <CardBody>
            <h1>No data</h1>
          </CardBody>
        </Card>
      )}
    </>
  );
}
