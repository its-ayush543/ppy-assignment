"use client";

import React, { useEffect, useState } from "react";

const bubbleConfig = [
  { label: "Online", color: "#FFA500", x: 120, y: 80 },
  { label: "New", color: "#008000", x: 220, y: 180 },
  { label: "Active", color: "#FF0000", x: 180, y: 120 },
  { label: "InActive", color: "#B22222", x: 80, y: 160 },
];

const ClientBubbleChart = () => {
  const [bubbles, setBubbles] = useState([
    { ...bubbleConfig[0], value: 0, r: 20 },
    { ...bubbleConfig[1], value: 0, r: 20 },
    { ...bubbleConfig[2], value: 0, r: 20 },
    { ...bubbleConfig[3], value: 0, r: 20 },
  ]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        const getRadius = (value) => {
          const minR = 20,
            maxR = 80;
          const minV = 1,
            maxV = 4500; // Based on API ranges
          return Math.max(
            minR,
            Math.min(
              maxR,
              minR + ((value - minV) / (maxV - minV)) * (maxR - minR)
            )
          );
        };
        setBubbles([
          {
            ...bubbleConfig[0],
            value: data.bubbleClients?.[0]?.value || 0,
            r: getRadius(data.bubbleClients?.[0]?.value || 0),
          },
          {
            ...bubbleConfig[1],
            value: data.bubbleClients?.[1]?.value || 0,
            r: getRadius(data.bubbleClients?.[1]?.value || 0),
          },
          {
            ...bubbleConfig[2],
            value: data.bubbleClients?.[2]?.value || 0,
            r: getRadius(data.bubbleClients?.[2]?.value || 0),
          },
          {
            ...bubbleConfig[3],
            value: data.bubbleClients?.[3]?.value || 0,
            r: getRadius(data.bubbleClients?.[3]?.value || 0),
          },
        ]);
      });
  }, []);

  return (
    <div
      className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center"
      style={{ width: 320, height: 320 }}
    >
      <div
        className="flex items-center mb-2 relative"
        style={{ width: "100%" }}
      >
        <span className="font-semibold text-sm">CLIENTS</span>
        <button
          className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold absolute right-0"
          style={{ top: 0 }}
        >
          Download Report
        </button>
      </div>
      <svg
        width="100%"
        height="220"
        viewBox="0 0 320 220"
        style={{ display: "block", background: "none", border: "none" }}
      >
        {bubbles.map((bubble, idx) => (
          <g key={idx}>
            <circle
              cx={bubble.x}
              cy={bubble.y}
              r={bubble.r}
              fill={bubble.color}
              fillOpacity={0.85}
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
