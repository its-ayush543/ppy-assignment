"use client";

const ClientBubbleChart = () => {
  // Data for each client status
  const bubbles = [
    { label: "Online", value: 60, color: "#FFA500", x: 120, y: 80, r: 38 },
    { label: "New", value: 2, color: "#008000", x: 220, y: 180, r: 28 },
    { label: "Active", value: 541, color: "#FF0000", x: 180, y: 120, r: 60 },
    { label: "InActive", value: 3824, color: "#B22222", x: 80, y: 160, r: 75 },
  ];

  return (
    <div
      className="bg-white rounded-lg shadow p-4 relative"
      style={{ width: 320, height: 320 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-sm">CLIENTS</span>
        <button className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
          Download Report
        </button>
      </div>
      <svg
        width="320"
        height="220"
        style={{ display: "block", margin: "0 auto" }}
      >
        {bubbles.map((bubble, idx) => (
          <g key={idx}>
            <circle
              cx={bubble.x}
              cy={bubble.y}
              r={bubble.r}
              fill={bubble.color}
              fillOpacity={0.85}
              stroke="#fff"
              strokeWidth={3}
            />
            <text
              x={bubble.x}
              y={bubble.y + 6}
              textAnchor="middle"
              fontSize={bubble.r > 60 ? 28 : 18}
              fontWeight="bold"
              fill="#fff"
              style={{ pointerEvents: "none" }}
            >
              {bubble.value}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex justify-center gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ background: "#FFA500" }}
          ></span>
          Online
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ background: "#008000" }}
          ></span>
          New
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ background: "#FF0000" }}
          ></span>
          Active
        </div>
        <div className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded-full inline-block"
            style={{ background: "#B22222" }}
          ></span>
          InActive
        </div>
      </div>
    </div>
  );
};

export default ClientBubbleChart;
