import { useContext } from "react";
import {
  AxisLeft,
  AxisRight,
  AxisTop,
  AxisBottom,
  SharedAxisProps,
  AxisScale,
} from "@visx/axis";

import { ChartContext } from "./chart";

interface AxisProps {
  orientation: "top" | "bottom" | "left" | "right";
  xOrY?: "x" | "y";
  label?: string;
  left?: number;
  top?: number;
  labelOffset: number;
  tickFormat?: (num: number) => string;
}

export default function Axis({
  orientation,
  xOrY = "x",
  label,
  left = 0,
  top = 0,
  labelOffset = 0,
  tickFormat,
}: AxisProps) {
  const chartContext = useContext(ChartContext);

  if (chartContext) {
    const { height, xScale, yScale } = chartContext;

    let AxisComponent: React.ComponentType<SharedAxisProps<AxisScale>> = () =>
      null;

    let leftTop: number | undefined = undefined;
    let bottomTop: number | undefined = undefined;
    if (orientation === "bottom") {
      bottomTop = height - top;
      AxisComponent = AxisBottom;
    } else if (orientation === "top") {
      AxisComponent = AxisTop;
    } else if (orientation === "right") {
      AxisComponent = AxisRight;
    } else if (orientation === "left") {
      AxisComponent = AxisLeft;
      leftTop = -top;
    }

    const scale = xOrY === "x" ? xScale : yScale;

    // TODO: Need to add a tick time formatter for time scales or the dates will display as numbers
    return (
      <AxisComponent
        left={left}
        top={leftTop ?? bottomTop ?? 0}
        scale={scale}
        label={label}
        labelOffset={labelOffset}
        tickFormat={tickFormat}
      />
    );
  }
}
