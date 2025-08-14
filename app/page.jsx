"use client";
import ClientsBubbleChart from "@/components/ClientBubbleChart";
import SipBusinessChart from "@/components/SipBusinessChart";
import MonthlyMISChart from "@/components/MonthlyMISChart";
import Navbar from "@/components/Navbar";

import { useState, useEffect } from "react";

export default function Page() {
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [clientsData, setClientsData] = useState([]);
  const [sipBusinessData, setSipBusinessData] = useState([]);
  const [monthlyMISData, setMonthlyMISData] = useState([]);
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
        setClientsData(data.clients ?? []);
        setSipBusinessData(data.sipBusiness ?? []);
        setMonthlyMISData(data.monthlyMIS ?? []);
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
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-500">
      <Navbar />
      <main className="container mx-auto p-4 space-y-6">
        {/* AUM & SIP Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg animate-pulse h-48"
                ></div>
              ))
            : [
                { label: "AUM", value: aum, color: "text-green-500" },
                { label: "SIP", value: sip, color: "text-red-500" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg flex flex-col justify-between transition-transform transform hover:scale-105 duration-300"
                >
                  <p className="text-gray-500 dark:text-gray-300">
                    {item.label}
                  </p>
                  <h3 className="text-3xl font-bold">₹{item.value}</h3>
                  <p className={`${item.color} text-sm`}>+0.00%</p>
                  <button className="mt-2 text-blue-500 underline self-start hover:text-blue-600 transition-colors duration-200">
                    View Report
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
                  : "bg-white dark:bg-zinc-800 dark:text-white border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700"
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
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg animate-pulse h-28"
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
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300"
                >
                  <p className="text-gray-500 dark:text-gray-300">
                    {stat.label}
                  </p>
                  <h4 className="text-xl font-bold">{stat.value}</h4>
                </div>
              ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg h-80 animate-pulse"
                ></div>
              ))
            : [
                <div
                  key="clients"
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg h-80"
                >
                  <ClientsBubbleChart data={clientsData} />
                </div>,
                <div
                  key="sip"
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg h-80"
                >
                  <SipBusinessChart data={sipBusinessData} />
                </div>,
              ]}
        </div>

        {loading ? (
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg h-96 animate-pulse"></div>
        ) : (
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg h-96">
            <MonthlyMISChart data={monthlyMISData} />
          </div>
        )}
      </main>
    </div>
  );
}
