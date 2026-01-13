"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface RiskChartProps {
  probability: number;
}

export default function RiskChart({ probability }: RiskChartProps) {
  const risk = parseFloat((probability * 100).toFixed(1));
  const safe = parseFloat((100 - risk).toFixed(1));

  const data = [
    { name: "Risk", value: risk, color: "#ef4444" },
    { name: "Safe", value: safe, color: "#22c55e" },
  ];

  return (
    <div className="w-full h-80 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}

            label={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))} 
          </Pie>
          
          <Tooltip
              formatter={(value: number | string | (string | number)[] | undefined) => {
              if (typeof value === "number") {
                  return `${value.toFixed(1)}%`;
              }
              if (value == null) {
                  return "";
              }
              return String(value);
            }}
            contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            color: "#fff",
            backdropFilter: "blur(10px)",
          }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="square"
            formatter={(value, entry: any) =>
              `${value}: ${entry.payload.value.toFixed(1)}%`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
