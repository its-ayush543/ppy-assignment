"use client";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
  Legend,
} from "recharts";

export default function SipBusinessChart({ data }) {
  return (
    <div className="rounded-xl w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">SIP Business</h2>
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
