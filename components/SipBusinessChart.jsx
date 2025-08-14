"use client";
import { ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar, Line, Legend } from "recharts";

export default function SipBusinessChart({ data }) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">SIP Business</h2>
      <ComposedChart width={400} height={250} data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sip" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="target" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
}
