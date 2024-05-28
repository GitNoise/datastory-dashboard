import { useContext } from "react";
import { AreaClosed } from "@visx/shape";
import { LinearGradient } from "@visx/gradient";

import { ChartContext } from "./chart";

export default function Area() {
  const chartContext = useContext(ChartContext);

  if (chartContext) {
    const { data, xGet, yGet, yScale } = chartContext;

    return (
      <>
        <LinearGradient
          id="area-gradient"
          from={"#222"}
          to={"#fff"}
          toOpacity={0.1}
          fromOpacity={0.3}
        />
        <AreaClosed
          data={data}
          x={xGet}
          y={yGet}
          yScale={yScale}
          fill="url(#area-gradient)"
        />
      </>
    );
  }
}
