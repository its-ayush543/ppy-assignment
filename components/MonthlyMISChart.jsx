"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function MonthlyMISChart({ data }) {
  return (
    <div className="rounded-xl w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly MIS</h2>
      <LineChart width={400} height={250} data={data}>
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
