import React, { createContext } from "react";
import { useParentSize } from "@visx/responsive";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisScale } from "@visx/axis";
import { extent, max } from "d3-array";

interface ChartProps {
  children: React.ReactNode;
  data: any[];
  x: keyof any;
  y: keyof any;
  height?: number;
  padding?: number;
}

interface ChartContextType {
  data: any[];
  width: number;
  height: number;
  x: keyof any;
  y: keyof any;
  padding?: number;
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  xGet: (d: any) => any;
  yGet: (d: any) => any;
}

export const ChartContext = createContext<ChartContextType | undefined>(
  undefined
);

export default function Chart({
  children,
  data,
  x = "x",
  y = "y",
  height,
  padding,
}: ChartProps) {
  const {
    parentRef,
    width,
    height: pHeight,
  } = useParentSize({ debounceTime: 150 });

  // TODO: Add a "scale parser" to choose which scale (temporal, numerical, categorical, etc) to use
  const xScale = scaleLinear<number>({
    domain: extent(data, (d) => d[x]),
    range: [0, width - (padding ?? 0) * 2],
  });

  const yScale = scaleLinear<number>({
    domain: [0, max(data, (d) => d[y]) as number],
    range: [(height ?? pHeight) - (padding ?? 0) * 2, 0],
  });

  return (
    <div className="h-full" ref={parentRef}>
      <ChartContext.Provider
        value={{
          data: data,
          width: width,
          height: height ?? pHeight,
          x: x,
          y: y,
          padding: padding,
          xScale: xScale,
          yScale: yScale,
          xGet: (d) => xScale(d[x]),
          yGet: (d) => yScale(d[y]),
        }}
      >
        {children}
      </ChartContext.Provider>
    </div>
  );
}
