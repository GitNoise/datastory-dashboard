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
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { DataPoint } from "./actions";

interface TableProps {
  data: DataPoint[];
}

export default function Table({ data }: TableProps) {
  if (!data.length) {
    return;
  }

  return (
    <>
      <TableContainer>
        <ChakraTable variant="simple" size="sm">
          <TableCaption>Country data</TableCaption>
          <Thead>
            <Tr>
              <Th>Year</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d, i) => (
              <Tr key={i}>
                <Td>{d.year}</Td>
                <Td>{d.value}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Year</Th>
              <Th>Value</Th>
            </Tr>
          </Tfoot>
        </ChakraTable>
      </TableContainer>
    </>
  );
}
