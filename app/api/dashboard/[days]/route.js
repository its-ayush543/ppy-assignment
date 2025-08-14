export async function GET(req, { params }) {
  const { days } = await params;
  const numDays = parseInt(days, 10);

  // Dynamic chart data
  const clients = Array.from({ length: 8 }, () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
  }));

  const sipBusiness = Array.from({ length: numDays }, (_, i) => ({
    month: `Day ${i + 1}`,
    sip: Math.floor(Math.random() * 6000) + 1000,
    target: Math.floor(Math.random() * 6000) + 2000,
  }));

  const monthlyMIS = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("en", { month: "short" }),
    aum: Math.floor(Math.random() * 100000) + 5000,
    sip: Math.floor(Math.random() * 80000) + 1500,
    redemptions: Math.floor(Math.random() * 50000) + 1000,
  }));

  // Dashboard stats
  const aum = monthlyMIS[monthlyMIS.length - 1].aum;
  const sip = monthlyMIS[monthlyMIS.length - 1].sip;

  const stats = {
    purchases: Math.floor(Math.random() * 1000),
    redemptions: Math.floor(Math.random() * 500),
    rejectedTransactions: Math.floor(Math.random() * 50),
    sipRejections: Math.floor(Math.random() * 30),
    newSIP: Math.floor(Math.random() * 200),
  };

  return new Response(
    JSON.stringify({ aum, sip, stats, clients, sipBusiness, monthlyMIS }),
    { status: 200 }
  );
}
