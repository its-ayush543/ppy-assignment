"use client";
import ClientsBubbleChart from "@/components/ClientBubbleChart";
import SipBusinessChart from "@/components/SipBusinessChart";
import MonthlyMISChart from "@/components/MonthlyMISChart";
import Navbar from "@/components/Navbar";

import { useState, useEffect } from "react";

export default function Page() {
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);
  // Sample fallback data for charts
  const sampleClientsData = [
    { x: 43, y: 50 },
    { x: 48, y: 25 },
    { x: 49, y: 80 },
    { x: 59, y: 60 },
    { x: 78, y: 70 },
    { x: 31, y: 20 },
  ];
  const sampleSipBusinessData = [
    { month: "Jan", sip: 120, target: 100 },
    { month: "Feb", sip: 150, target: 130 },
    { month: "Mar", sip: 170, target: 160 },
    { month: "Apr", sip: 140, target: 120 },
  ];
  const sampleMonthlyMISData = [
    { month: "Jan", aum: 100, sip: 120, redemptions: 30 },
    { month: "Feb", aum: 110, sip: 150, redemptions: 40 },
    { month: "Mar", aum: 120, sip: 170, redemptions: 50 },
    { month: "Apr", aum: 115, sip: 140, redemptions: 35 },
  ];
  const [clientsData, setClientsData] = useState(sampleClientsData);
  const [sipBusinessData, setSipBusinessData] = useState(sampleSipBusinessData);
  const [monthlyMISData, setMonthlyMISData] = useState(sampleMonthlyMISData);
  const [aum, setAum] = useState(0);
  const [sip, setSip] = useState(0);
  const [stats, setStats] = useState({
    purchases: 0,
    redemptions: 0,
    rejectedTransactions: 0,
    sipRejections: 0,
    newSIP: 0,
  });

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`/api/dashboard/${days}`, { signal })
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setAum(data.aum ?? 0);
        setSip(data.sip ?? 0);
        setStats(data.stats ?? {});
        setClientsData(
          data.clients && data.clients.length > 0
            ? data.clients
            : sampleClientsData
        );
        setSipBusinessData(
          data.sipBusiness && data.sipBusiness.length > 0
            ? data.sipBusiness
            : sampleSipBusinessData
        );
        setMonthlyMISData(
          data.monthlyMIS && data.monthlyMIS.length > 0
            ? data.monthlyMIS
            : sampleMonthlyMISData
        );
      })
      .catch((err) => {
        // simple error handling: log and keep existing state
        // In production show an error UI to the user
        // eslint-disable-next-line no-console
        console.error("Failed to fetch dashboard:", err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [days]);

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-500">
      <Navbar />
      <main className="container mx-auto p-4 space-y-6">
        {/* AUM & SIP Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-white shadow animate-pulse h-32"
                ></div>
              ))
            : [
                {
                  label: "Current AUM",
                  value: aum ? new Intl.NumberFormat("en-IN").format(aum) : "0",
                  mom: "+0.77% MoM",
                  momColor: "text-green-600",
                  button: "View Report",
                },
                {
                  label: "Current SIP",
                  value: sip ? new Intl.NumberFormat("en-IN").format(sip) : "0",
                  mom: "+0% MoM",
                  momColor: "text-green-600",
                  button: "View Report",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-xl shadow flex flex-col justify-between border border-gray-200 p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-400 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700 text-lg">
                      {item.label}
                    </span>
                    <button className="bg-[#e53935] text-white text-xs px-3 py-1 rounded hover:bg-[#d32f2f] font-semibold">
                      {item.button}
                    </button>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {item.value}
                    </span>
                    <span
                      className={`${item.momColor} text-xs font-semibold ml-2`}
                    >
                      {item.mom}
                    </span>
                  </div>
                  <button className="text-[#388e3c] text-xs mt-2 underline hover:text-[#2e7031] font-medium self-end">
                    View Trend
                  </button>
                </div>
              ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3">
          {[3, 7, 10, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-5 py-2 rounded-lg border font-medium transition-colors duration-200 ${
                days === d
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              {d} Days
            </button>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-5 gap-6">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white shadow-lg animate-pulse h-28"
                ></div>
              ))
            : [
                { label: "Purchases", value: stats.purchases },
                { label: "Redemptions", value: stats.redemptions },
                {
                  label: "Rejected Transactions",
                  value: stats.rejectedTransactions,
                },
                { label: "SIP Rejections", value: stats.sipRejections },
                { label: "New SIP", value: stats.newSIP },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-2xl bg-white shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300"
                >
                  <p className="text-gray-500">{stat.label}</p>
                  <h4 className="text-xl font-bold">{stat.value}</h4>
                </div>
              ))}
        </div>

        {/* Charts in one line */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 p-6 rounded-2xl bg-white shadow-lg h-80 animate-pulse"
                ></div>
              ))
            : [
                <div
                  key="clients"
                  className="flex-1 rounded-2xl bg-white shadow-lg h-80 flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <ClientsBubbleChart data={clientsData} />
                </div>,
                <div
                  key="sip"
                  className="flex-1 rounded-2xl bg-white shadow-lg h-80 flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <SipBusinessChart data={sipBusinessData} />
                </div>,
                <div
                  key="mis"
                  className="flex-1 rounded-2xl bg-white shadow-lg h-80 flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  <MonthlyMISChart data={monthlyMISData} />
                </div>,
              ]}
        </div>
      </main>
    </div>
  );
}
