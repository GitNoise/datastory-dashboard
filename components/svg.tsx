import { useContext, ReactNode } from "react";
import { ChartContext } from "./chart";

export default function Svg({ children }: { children: ReactNode }) {
  const chartContext = useContext(ChartContext);

  if (chartContext) {
    const { width, height, padding } = chartContext;

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${padding},${padding})`}>{children}</g>
      </svg>
    );
  }
}
