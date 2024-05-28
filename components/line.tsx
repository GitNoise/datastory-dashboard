import { useContext } from "react";
import { LinePath } from "@visx/shape";

import { ChartContext } from "./chart";

export default function Line() {
  const chartContext = useContext(ChartContext);

  if (chartContext) {
    const { data, xGet, yGet } = chartContext;

    return (
      <LinePath data={data} x={xGet} y={yGet} stroke="#222" strokeWidth={3} />
    );
  }
}
