// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// export default function FeatureImportanceChart({
//   importance,
// }: {
//   importance: Record<string, number>;
// }) {
//   const data = Object.entries(importance)
//     .map(([feature, value]) => ({
//       feature,
//       value: parseFloat((value * 100).toFixed(2)), // Convert to percentage roughly or just scale
//     }))
//     .sort((a, b) => b.value - a.value);

//   return (
//     <div className="space-y-6 md:space-y-8">
//       <div className="glass-card p-6 md:p-8">
//         <h3 className="text-lg md:text-xl font-bold text-white mb-6">
//           📈 Global Feature Importance
//         </h3>
//         <div className="h-[400px] md:h-[500px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               layout="vertical"
//               data={data}
//               margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
//             >
//               <XAxis type="number" stroke="#9ca3af" />
//               <YAxis
//                 dataKey="feature"
//                 type="category"
//                 width={100}
//                 stroke="#9ca3af"
//                 tick={{ fontSize: 12 }}
//               />
//               <Tooltip
//                 cursor={false}
//                 contentStyle={{
//                   backgroundColor: "rgba(255, 255, 255, 0.5)",
//                   border: "1px solid rgba(255, 255, 255, 0.1)",
//                   borderRadius: "8px",
//                   color: "#000000ff",
//                   backdropFilter: "blur(10px)",
//                 }}
//               />
//               <Bar dataKey="value" fill="#000000ff" radius={[0, 4, 4, 0]}>
//                 {data.map((entry, index) => (
//                   // <Cell key={`cell-${index}`} fill="#633f91ff" />
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={`rgba(255, 255, 255, ${0.3 + index / data.length})`}
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* <div className="glass-card p-6 md:p-8 overflow-x-auto">
//         <h3 className="text-lg md:text-xl font-bold text-white mb-6">
//           Importance Data
//         </h3>
//         <table className="w-full text-left text-sm md:text-base text-gray-300">
//           <thead className="text-xs uppercase bg-white/5 text-gray-400">
//             <tr>
//               <th className="px-4 py-3 rounded-l-lg">Feature</th>
//               <th className="px-4 py-3 rounded-r-lg">Importance Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row) => (
//               <tr
//                 key={row.feature}
//                 className="border-b border-white/5 hover:bg-white/5 transition-colors"
//               >
//                 <td className="px-4 py-3 font-medium text-white capitalize">
//                   {row.feature.replace(/_/g, " ")}
//                 </td>
//                 <td className="px-4 py-3 font-semibold text-white">
//                   {row.value}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> */}
//     </div>
//   );
// }





"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

type FeatureImportanceChartProps = {
  importance: Record<string, number>;
};


const FEATURE_LABELS: Record<string, string> = {
  ap_hi: "Systolic BP",
  ap_lo: "Diastolic BP",
  cholesterol: "Cholesterol Level",
  gluc: "Glucose Level",
  age_in_years: "Age ( In Years)",
  bmi: "BMI",
  gender: "Gender",
  smoke: "Smoking Status",
  alco: "Alcohol Intake",
  active: "Physical Activity",
};


export default function FeatureImportanceChart({
  importance,
}: FeatureImportanceChartProps) {
  const data = Object.entries(importance)
    .map(([feature, value]) => ({
      feature : FEATURE_LABELS[feature] ?? feature,
      value: Number((value * 100).toFixed(2)), // percentage
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="h-[388px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 40, left: 20, bottom: 10 }}
        >
          <XAxis
            type="number"
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
            unit="%"
          />

          <YAxis
            dataKey="feature"
            type="category"
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
            width={110}
          />

          <Tooltip
            cursor={false}
            formatter={(value) => (value != null ? `${value}%` : "")}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              backdropFilter: "blur(10px)",
            }}
            labelStyle={{
              color: "#000000",
              fontWeight: 600,
            }}
            itemStyle={{
              color: "#000000",
            }}
          />

          <Bar
            dataKey="value"
            radius={[0, 6, 6, 0]}
            fill="rgba(255, 255, 255, 0.28)"
          >
            <LabelList
              dataKey="value"
              position="right"
              formatter={(value) =>
                typeof value === "number" ? `${value}%` : ""
              }
              style={{
                fill: "#e5e7eb",
                fontSize: 12,
                fontWeight: 500,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}