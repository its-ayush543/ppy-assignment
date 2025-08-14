import { useEffect, useState } from "react";
import ClientBubbleChart from "./ClientBubbleChart";

export default function ClientBubbleChartContainer() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((result) => {
        // Transform API stats to bubble chart format
        const bubbles = [
          {
            label: "Online",
            value: result.stats.newSIP,
            color: "#FFA500",
            x: 120,
            y: 80,
            r: 38,
          },
          {
            label: "New",
            value: result.stats.sipRejections,
            color: "#008000",
            x: 220,
            y: 180,
            r: 28,
          },
          {
            label: "Active",
            value: result.stats.purchases,
            color: "#FF0000",
            x: 180,
            y: 120,
            r: 60,
          },
          {
            label: "InActive",
            value: result.stats.redemptions,
            color: "#B22222",
            x: 80,
            y: 160,
            r: 75,
          },
        ];
        setData(bubbles);
      });
  }, []);

  return <ClientBubbleChart data={data} />;
}
