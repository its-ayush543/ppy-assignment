"use client";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function ClientsBubbleChart({ data }) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Clients</h2>
      <ScatterChart width={400} height={250}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" name="Clients" />
        <YAxis dataKey="y" name="Value" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Clients" data={data} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
}

