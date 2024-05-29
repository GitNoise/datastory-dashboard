"use client";

import React from "react";

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { DataPoint } from "./actions";

interface TableProps {
  data: DataPoint[];
  valueLabel?: string;
}

export default function Table({ data, valueLabel = "Value" }: TableProps) {
  if (!data.length) {
    return;
  }

  return (
    <>
      <TableContainer>
        <ChakraTable variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Year</Th>
              <Th isNumeric>{valueLabel}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d, i) => (
              <Tr key={i}>
                <Td>{d.year}</Td>
                <Td isNumeric>{d.value}</Td>
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    </>
  );
}
