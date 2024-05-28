"use client";

import React from "react";

import { Select } from "@chakra-ui/react";

type OptionsType = { id: string; name: string };

type DropDownProps<T> = {
  data: T[];
  placeholderText?: string;
  onChange: (selectedId: string) => void;
};

export default function DropDown<T extends OptionsType>({
  data,
  placeholderText = "- Select -",
  onChange,
}: DropDownProps<T>) {
  return (
    <Select
      placeholder={placeholderText}
      onChange={(e) => onChange(e.target.value)}
    >
      {data.map((d) => (
        <option key={d.id} value={d.id}>
          {d.name}
        </option>
      ))}
    </Select>
  );
}
