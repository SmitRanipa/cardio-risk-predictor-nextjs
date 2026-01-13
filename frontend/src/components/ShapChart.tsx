  "use client";

  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
  } from "recharts";

  const FEATURE_LABELS_CHART: Record<string, string> = {
    ap_hi: "Systolic BP",
    ap_lo: "Diastolic BP",
    cholesterol: "Cholesterol Level",
    gluc: "Glucose Level",
    bmi: "BMI",
    gender: "Gender",
    age_in_years: "Age (Years) ",
    weight: "Weight",
    height: "Height",
    smoke: "Smoking",
    alco: "Alcohol Intake",
    active: "Physical Activity",
  };

  const FEATURE_LABELS_TABLE: Record<string, string> = {
    ap_hi: "Systolic Blood Pressure",
    ap_lo: "Diastolic Blood Pressure",
    cholesterol: "Cholesterol Level",
    gluc: "Glucose Level",
    bmi: "Body Mass Index (BMI)",
    gender: "Gender",
    age_in_years: "Age In Years",
    weight: "Weight",
    height: "Height",
    smoke: "Smoking",
    alco: "Alcohol Intake",
    active: "Physical Activity",
  };

  export default function ShapChart({ shapValues }: { shapValues: any }) {

    const data = Object.entries(shapValues)
    .map(([feature, value]: any) => ({
      feature,
      chartLabel:
        FEATURE_LABELS_CHART[feature] ?? feature.replace(/_/g, " "),
      tableLabel:
        FEATURE_LABELS_TABLE[feature] ?? feature.replace(/_/g, " "),
      value: parseFloat(value.toFixed(4)),
    }))
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    return (
      <div className="space-y-6">
        <div className="glass-card p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold text-white mb-6">
            🧠 SHAP Explanation
          </h3>
          <div className="h-[350px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis
                  dataKey="chartLabel"
                  type="category"
                  width={100}
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "#000000ff",
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.value > 0 ? "#ef4444" : "#22c55e"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 md:p-8 overflow-x-auto">
          <h3 className="text-lg md:text-xl font-bold text-white mb-6">
            Detailed Values
          </h3>
          <table className="w-full text-left text-sm md:text-base text-gray-300">
            <thead className="text-xs uppercase bg-white/5 text-gray-400">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Feature</th>
                <th className="px-4 py-3 rounded-r-lg">SHAP Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  {/* <td className="px-4 py-3 font-medium text-white capitalize">
                    {row.feature.replace(/_/g, " ")}
                  </td> */}
                  <td className="px-4 py-3 font-medium text-white">
                    {row.tableLabel}
                  </td>

                  <td
                    className={`px-4 py-3 font-semibold ${
                      row.value > 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
