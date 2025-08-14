import { NextResponse } from "next/server";

function seedRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const days = Number(searchParams.get("days") || "7");
  const rand = seedRandom(days);

  const baseAum = 125000000;
  const baseSip = 4500000;
  const aumMoM = (rand() - 0.5) * 10;
  const sipMoM = (rand() - 0.5) * 10;

  const stats = {
    purchases: Math.floor(rand() * 200 + 400),
    redemptions: Math.floor(rand() * 150 + 200),
    rejectedTransactions: Math.floor(rand() * 20 + 5),
    sipRejections: Math.floor(rand() * 15 + 2),
    newSIP: Math.floor(rand() * 120 + 60),
  };

  const bubbleClients = [
    { name: "Online", value: Math.floor(rand() * 100 + 20) },
    { name: "New", value: Math.floor(rand() * 10 + 1) },
    { name: "Active", value: Math.floor(rand() * 500 + 100) },
    { name: "InActive", value: Math.floor(rand() * 4000 + 500) },
  ];
  const clients = Array.from({ length: 12 }).map((_, i) => ({
    name: `Client ${i + 1}`,
    value: Math.floor(rand() * 100 + 20),
  }));

  const sipBusiness = Array.from({ length: days }).map((_, i) => ({
    date: `${i + 1}`,
    bar: Math.floor(rand() * 100 + 50),
    line: Math.floor(rand() * 80 + 40),
  }));

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyMIS = months.map((m) => ({
    month: m,
    aum: Math.floor(baseAum * (0.8 + rand() * 0.4)),
    sip: Math.floor(baseSip * (0.8 + rand() * 0.4)),
    clients: Math.floor(1000 + rand() * 500),
  }));

  return NextResponse.json({
    aum: Math.floor(baseAum * (1 + aumMoM / 100)),
    sip: Math.floor(baseSip * (1 + sipMoM / 100)),
    stats,
    clients,
    bubbleClients,
    sipBusiness,
    monthlyMIS,
  });
}
