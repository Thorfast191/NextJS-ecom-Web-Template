"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface Props {
  data: {
    month: string;

    revenue: number;
  }[];
}

export default function RevenueChart({ data }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-x-auto">
      {/* HEADER */}

      <div className="mb-8">
        <h2 className="text-3xl font-black">Revenue Analytics</h2>

        <p className="text-slate-400 mt-2">Monthly revenue overview</p>
      </div>

      {/* CHART */}

      <AreaChart width={1100} height={400} data={data}>
        <XAxis dataKey="month" stroke="#94a3b8" />

        <YAxis stroke="#94a3b8" />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.15}
        />
      </AreaChart>
    </div>
  );
}
