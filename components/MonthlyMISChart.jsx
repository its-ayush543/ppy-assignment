"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function MonthlyMISChart({ data }) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Monthly MIS</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="aum" stroke="#8884d8" />
        <Line type="monotone" dataKey="sip" stroke="#82ca9d" />
        <Line type="monotone" dataKey="redemptions" stroke="#ff7300" />
      </LineChart>
    </div>
  );
}
