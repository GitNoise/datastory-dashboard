"use client";

import React, { useEffect, useState } from "react";
import { format } from "d3-format";
import { Card, CardBody, Tag, Box, Flex, Text } from "@chakra-ui/react";

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
      <Box my={4}>
        <DropDown
          onChange={handleCountriesChange}
          data={countries.map((c) => ({ id: c.id, name: c.name }))}
          aria-label="country dropdown"
        />
      </Box>

      {countryData ? (
        <section aria-label="country line chart and data table">
          <Box my={4}>
            <Card backgroundColor={"#fff"}>
              <CardBody>
                <Flex gap={2}>
                  <Text fontSize="md">Parameters:</Text>
                  <Tag>{countryData.cohort}</Tag>
                  <Tag>{countryData.measure}</Tag>
                </Flex>

                <Chart
                  data={countryData.data}
                  x={"year"}
                  y={"value"}
                  height={300}
                  padding={44}
                  aria-label="country line chart"
                >
                  <Svg>
                    <Axis
                      left={0}
                      top={112}
                      orientation="bottom"
                      xOrY="x"
                      label="Year"
                      labelOffset={8}
                      tickFormat={(year) => format("d")(year)}
                    />

                    <Axis
                      left={0}
                      top={24}
                      orientation="left"
                      xOrY="y"
                      label="Age"
                      labelOffset={28}
                    />
                    <Line />
                    <Area />
                  </Svg>
                </Chart>
                <Table
                  data={countryData.data}
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
