import { useContext } from "react";
import { css } from "@emotion/css";
import {
  AxisLeft,
  AxisRight,
  AxisTop,
  AxisBottom,
  Orientation,
} from "@visx/axis";

import { ChartContext } from "./chart";

interface AxisProps {
  orientation: "top" | "bottom" | "left" | "right";
  xOrY?: "x" | "y";
}

export default function Axis({ orientation, xOrY = "x" }: AxisProps) {
  const chartContext = useContext(ChartContext);

  if (chartContext) {
    const { height, xScale, yScale, padding } = chartContext;

    let AxisComponent,
      offset = 0;
    if (orientation === "bottom") {
      AxisComponent = AxisBottom;
      offset = height + -(padding ?? 0);
    } else if (orientation === "top") {
      AxisComponent = AxisTop;
    } else if (orientation === "right") {
      AxisComponent = AxisRight;
    } else if (orientation === "left") {
      AxisComponent = AxisLeft;

      offset = -(padding ?? 0);
    }

    const scale = xOrY === "x" ? xScale : yScale;

    // TODO: Need to add a tick time formatter for time scales or the dates will display as numbers
    return <AxisComponent top={offset} scale={scale} />;
  }
}
