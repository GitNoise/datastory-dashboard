"use client";

import React, { useEffect, useState } from "react";
import { format } from "d3-format";
import { Card, CardBody, Tag, Box, Flex, Text } from "@chakra-ui/react";

import DropDown from "./dropDown";
import {
  Country,
  CountryData,
  getCountry as getCountryData,
} from "../actions/countryActions";
import { Measure } from "../actions/measureActions";
import Table from "./table";
import Chart from "./chart";
import Svg from "./svg";
import Line from "./line";
import Axis from "./axis";
import Area from "./area";

interface DashboardProps {
  countries: Array<Country>;
  measures: Array<Measure>;
}

export default function Dashboard({ countries, measures }: DashboardProps) {
  const [countryId, setCountryId] = useState<string>();
  const [measureId, setMeasureId] = useState<string>();
  const [countryData, setCountryData] = useState<CountryData | null>(null);

  const handleCountriesChange = (id: string) => {
    setCountryId(id);
  };

  const handleMeasureChange = (id: string) => {
    setMeasureId(id);
  };

  useEffect(() => {
    async function getData(countryId: string, measureId: string) {
      const data = await getCountryData(countryId, measureId);
      setCountryData(data);
    }

    if (countryId && measureId) {
      getData(countryId, measureId);
    }
  }, [countryId, measureId]);

  const measure = measures.find((d) => d.id === measureId);
  let measureLabel = measure?.name;
  measureLabel += measure?.unit ? ` (${measure?.unit})` : "";

  const country = countries.find((d) => d.id === countryId);

  return (
    <>
      {/* TODO: make responsive so it break across two rows on narrow screens */}
      <Flex my={4} gap={8}>
        <DropDown
          placeholderText="- Select country -"
          onChange={handleCountriesChange}
          data={countries.map((c) => ({ id: c.id, name: c.name }))}
          aria-label="country dropdown"
        />
        <DropDown
          placeholderText="- Select measure -"
          onChange={handleMeasureChange}
          data={measures}
          aria-label="measure dropdown"
        />
      </Flex>

      {countryData ? (
        <section aria-label="country line chart and data table">
          <Box my={4}>
            <Card backgroundColor={"#fff"}>
              <CardBody>
                {country && measure && (
                  <>
                    {/* TODO: make responsive so it break across two rows on narrow screens */}
                    <Flex gap={2}>
                      <Text fontSize="md">Parameters:</Text>
                      <Tag>{country.name}</Tag>
                      <Tag>{measure.name}</Tag>
                    </Flex>
                  </>
                )}

                <Chart
                  data={countryData.data.sort((a, b) =>
                    a.year < b.year ? -1 : 1
                  )}
                  x={"year"}
                  y={"value"}
                  height={300}
                  padding={50}
                  aria-label="country line chart"
                >
                  <Svg>
                    <Axis
                      left={0}
                      top={50 * 2}
                      orientation="bottom"
                      xOrY="x"
                      label="Year"
                      labelOffset={8}
                      tickFormat={(year) => format("d")(year)}
                    />

                    <Axis
                      left={0}
                      top={0}
                      orientation="left"
                      xOrY="y"
                      label={measure ? measureLabel : undefined}
                      labelOffset={35}
                    />
                    <Line />
                    <Area />
                  </Svg>
                </Chart>
                <Table
                  data={countryData.data}
                  valueLabel={measure ? measureLabel : undefined}
                  aria-label="country data table"
                />
              </CardBody>
            </Card>
          </Box>
        </section>
      ) : (
        <section aria-label="no data">
          <Box my={4}>
            <Card backgroundColor={"#fff"}>
              <CardBody>
                <h1>No data</h1>
              </CardBody>
            </Card>
          </Box>
        </section>
      )}
    </>
  );
}
