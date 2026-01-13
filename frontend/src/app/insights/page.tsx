// "use client";

// import { useEffect, useState } from "react";
// import { getInsights } from "@/lib/api";
// import FeatureImportanceChart from "@/components/FeatureImportanceChart";
// import {
//   BarChart3,
//   Loader2,
//   AlertCircle,
//   TrendingUp,
//   Brain,
//   Zap,
// } from "lucide-react";

// export default function InsightsPage() {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getInsights()
//       .then((res) => {
//         setData(res);
//         setLoading(false);
//         window.scrollTo({ top: 0, behavior: "instant" });
//       })
//       .catch((err) => {
//         setError("Failed to load insights. Ensure backend is running.");
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen gradient-bg py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="space-y-8">
//           {/* Header */}
//           <div className="glass-card p-6 md:p-10 card-hover animate-fadeIn">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
//               <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl">
//                 <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
//               </div>
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//                   Model Insights Dashboard
//                 </h1>
//                 <p className="text-gray-400 text-base md:text-lg">
//                   Comprehensive analysis of feature importance and model behavior
//                 </p>
//               </div>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
//               <div className="glass-card p-4 md:p-6 card-hover">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-400 mb-1">Features Analyzed</p>
//                     <p className="text-3xl md:text-4xl font-bold text-white">11</p>
//                   </div>
//                   <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
//                 </div>
//               </div>
//               <div className="glass-card p-4 md:p-6 card-hover">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-400 mb-1">Model Type</p>
//                     <p className="text-2xl md:text-3xl font-bold text-white">
//                       XGBoost
//                     </p>
//                   </div>
//                   <Brain className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
//                 </div>
//               </div>
//               <div className="glass-card p-4 md:p-6 card-hover">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-400 mb-1">Accuracy</p>
//                     <p className="text-3xl md:text-4xl font-bold text-white">
//                       72.11%
//                     </p>
//                   </div>
//                   <Zap className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Loading State */}
//           {loading && (
//             <div className="glass-card p-12 md:p-16 rounded-2xl text-center animate-fadeIn">
//               <div className="flex flex-col items-center gap-4">
//                 <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-blue-400 animate-spin" />
//                 <p className="text-gray-400 text-lg">Loading model insights...</p>
//               </div>
//             </div>
//           )}

//           {/* Error State */}
//           {error && (
//             <div className="glass-card border-red-500/50 bg-red-500/10 p-6 rounded-2xl animate-fadeIn">
//               <div className="flex items-center gap-3">
//                 <AlertCircle className="w-6 h-6 text-red-400" />
//                 <p className="text-red-200">{error}</p>
//               </div>
//             </div>
//           )}

//           {/* Data Content */}
//           {data && data.feature_importance && (
//             <div className="space-y-6 md:space-y-8 animate-fadeIn">
//               {/* Feature Importance Chart */}
//               <div className="glass-card p-6 md:p-10">
//                 <div className="mb-6">
//                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                     Feature Importance Analysis
//                   </h3>
//                   <p className="text-gray-400 text-base md:text-lg">
//                     Each feature's contribution to the model's predictive power
//                   </p>
//                 </div>
//                 <FeatureImportanceChart importance={data.feature_importance} />
//               </div>

//               {/* Model Performance & Insights */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
//                 {/* Model Performance */}
//                 <div className="glass-card p-6 md:p-8">
//                   <h4 className="font-bold text-xl md:text-2xl text-white mb-6">
//                     Model Performance
//                   </h4>
//                   <div className="space-y-6">
//                     <div>
//                       <div className="flex justify-between mb-2">
//                         <span className="text-sm md:text-base text-gray-300">
//                           Accuracy
//                         </span>
//                         <span className="text-sm md:text-base font-semibold text-white">
//                           72.11%
//                         </span>
//                       </div>
//                       <div className="h-3 bg-white/10 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
//                           style={{ width: "72.11%" }}
//                         ></div>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between mb-2">
//                         <span className="text-sm md:text-base text-gray-300">
//                           Precision
//                         </span>
//                         <span className="text-sm md:text-base font-semibold text-white">
//                           69.74%
//                         </span>
//                       </div>
//                       <div className="h-3 bg-white/10 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
//                           style={{ width: "69.74%" }}
//                         ></div>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="flex justify-between mb-2">
//                         <span className="text-sm md:text-base text-gray-300">
//                           Recall
//                         </span>
//                         <span className="text-sm md:text-base font-semibold text-white">
//                           77.08%
//                         </span>
//                       </div>
//                       <div className="h-3 bg-white/10 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
//                           style={{ width: "77.08%" }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Key Insights */}
//                 <div className="glass-card p-6 md:p-8">
//                   <h4 className="font-bold text-xl md:text-2xl text-white mb-6">
//                     Key Insights
//                   </h4>
//                   <ul className="space-y-4">
//                     <li className="flex items-start gap-3">
//                       <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
//                       <span className="text-sm md:text-base text-gray-300">
//                         Blood pressure metrics show highest predictive power
//                       </span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
//                       <span className="text-sm md:text-base text-gray-300">
//                         Age and cholesterol are significant contributors
//                       </span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
//                       <span className="text-sm md:text-base text-gray-300">
//                         Lifestyle factors moderately influence risk
//                       </span>
//                     </li>
//                     <li className="flex items-start gap-3">
//                       <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
//                       <span className="text-sm md:text-base text-gray-300">
//                         Model achieves strong discrimination ability (AUC: 0.94)
//                       </span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

//ChatGPT Version
// "use client";

// import { useEffect, useState } from "react";
// import { getInsights } from "@/lib/api";
// import FeatureImportanceChart from "@/components/FeatureImportanceChart";
// import {
//   BarChart3,
//   Loader2,
//   AlertCircle,
//   TrendingUp,
//   Brain,
//   Zap,
//   ShieldAlert,
//   CheckCircle,
// } from "lucide-react";

// export default function InsightsPage() {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getInsights()
//       .then((res) => {
//         setData(res);
//         setLoading(false);
//         window.scrollTo({ top: 0, behavior: "instant" });
//       })
//       .catch(() => {
//         setError("Failed to load insights. Ensure backend is running.");
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen gradient-bg py-12">
//       <div className="max-w-7xl mx-auto px-4 space-y-10">

//         {/* ================= HERO ================= */}
//         <div className="glass-card p-8 md:p-10 animate-fadeIn">
//           <div className="flex items-center gap-5 mb-4">
//             <div className="p-4 bg-purple-500/20 rounded-2xl">
//               <BarChart3 className="w-10 h-10 text-purple-400" />
//             </div>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-white">
//                 Model Insights & Explainability
//               </h1>
//               <p className="text-gray-400 mt-1">
//                 Transparent explanation of how the AI evaluates cardiovascular risk
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ================= SUMMARY CARDS ================= */}
//         <div className="grid md:grid-cols-4 gap-6">
//           <SummaryCard title="Features Used" value="11" icon={<TrendingUp />} />
//           <SummaryCard title="Model Type" value="Gradient Boosting" icon={<Brain />} />
//           <SummaryCard title="Decision Threshold" value="0.40" icon={<Zap />} />
//           <SummaryCard title="Accuracy" value="72.11%" icon={<CheckCircle />} />
//         </div>

//         {/* ================= LOADING / ERROR ================= */}
//         {loading && (
//           <div className="glass-card p-12 text-center">
//             <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-400" />
//             <p className="text-gray-400 mt-4">Loading insights…</p>
//           </div>
//         )}

//         {error && (
//           <div className="glass-card bg-red-500/10 border border-red-500/30 p-6">
//             <div className="flex items-center gap-3">
//               <AlertCircle className="text-red-400" />
//               <p className="text-red-200">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* ================= PERFORMANCE METRICS ================= */}
//         <div className="glass-card p-8">
//           <h3 className="text-2xl font-bold text-white mb-6">
//             Model Performance Metrics
//           </h3>

//           <div className="grid md:grid-cols-4 gap-6">
//             <Metric label="Accuracy" value="72.11%" />
//             <Metric label="Recall" value="77.08%" highlight />
//             <Metric label="Precision" value="69.74%" />
//             <Metric label="F1 Score" value="73.20%" />
//           </div>

//           <p className="text-gray-400 text-sm mt-6">
//             Recall is prioritized to reduce false negatives in medical screening.
//           </p>
//         </div>

//         {/* ================= MODEL COMPARISON ================= */}
//         <div className="glass-card p-8">
//           <h3 className="text-2xl font-bold text-white mb-6">
//             Model Comparison
//           </h3>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="text-gray-400 border-b border-white/10">
//                   <th className="py-3">Model</th>
//                   <th>Accuracy</th>
//                   <th>Recall</th>
//                   <th>Precision</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {[
//                   ["Logistic Regression (Weighted)", "72.08%", "66.46%", "74.39%"],
//                   ["Random Forest", "72.61%", "67.89%", "74.49%"],
//                   ["Gradient Boosting (0.5)", "72.77%", "67.80%", "74.81%"],
//                   ["Gradient Boosting (0.40)", "72.11%", "77.08%", "69.74%"],
//                 ].map((row, i) => (
//                   <tr
//                     key={i}
//                     className={`border-b border-white/5 ${
//                       i === 3 ? "bg-green-500/10" : ""
//                     }`}
//                   >
//                     <td className="py-3 font-medium text-white">{row[0]}</td>
//                     <td>{row[1]}</td>
//                     <td>{row[2]}</td>
//                     <td>{row[3]}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <p className="text-gray-400 text-sm mt-4">
//             Final model selected due to highest recall with acceptable precision.
//           </p>
//         </div>

//         {/* ================= FEATURE IMPORTANCE ================= */}
//         {data?.feature_importance && (
//           <div className="glass-card p-8">
//             <h3 className="text-2xl font-bold text-white mb-4">
//               Global Feature Importance
//             </h3>
//             <FeatureImportanceChart importance={data.feature_importance} />
//           </div>
//         )}

//         {/* ================= KEY INSIGHTS ================= */}
//         <div className="glass-card p-8">
//           <h3 className="text-2xl font-bold text-white mb-6">
//             Key Medical Insights
//           </h3>
//           <ul className="space-y-4 text-gray-300">
//             <li>• Blood pressure is the strongest predictor of cardiovascular risk</li>
//             <li>• Age and cholesterol significantly influence predictions</li>
//             <li>• Lifestyle habits moderately adjust overall risk</li>
//             <li>• Higher recall ensures fewer high-risk patients are missed</li>
//           </ul>
//         </div>

//         {/* ================= DISCLAIMER ================= */}
//         <div className="glass-card p-6 border border-yellow-500/30 bg-yellow-500/10">
//           <div className="flex gap-3">
//             <ShieldAlert className="text-yellow-400" />
//             <div>
//               <p className="font-semibold text-yellow-200 mb-1">
//                 Medical Disclaimer
//               </p>
//               <p className="text-sm text-yellow-100">
//                 This tool is for educational purposes only and should not replace
//                 professional medical consultation.
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */

// function SummaryCard({ title, value, icon }: any) {
//   return (
//     <div className="glass-card p-5 flex justify-between items-center">
//       <div>
//         <p className="text-sm text-gray-400">{title}</p>
//         <p className="text-2xl font-bold text-white">{value}</p>
//       </div>
//       <div className="text-blue-400">{icon}</div>
//     </div>
//   );
// }

// function Metric({
//   label,
//   value,
//   highlight,
// }: {
//   label: string;
//   value: string;
//   highlight?: boolean;
// }) {
//   return (
//     <div
//       className={`glass-card p-5 text-center ${
//         highlight ? "border border-green-500/40 bg-green-500/10" : ""
//       }`}
//     >
//       <p className="text-gray-400 text-sm">{label}</p>
//       <p className="text-2xl font-bold text-white">{value}</p>
//     </div>
//   );
// }

//Updated Advanced Version DeepSeek
"use client";

import { useEffect, useState } from "react";
import { getInsights } from "@/lib/api";
import Footer from "@/components/Footer";
import FeatureImportanceChart from "@/components/FeatureImportanceChart";
import {
  BarChart3,
  Loader2,
  AlertCircle,
  TrendingUp,
  Brain,
  Zap,
  ShieldAlert,
  CheckCircle,
  Target,
  LineChart,
  Activity,
  HeartPulse,
  Heart,
  Cpu,
  Code2,
  Server,
  Layers,
} from "lucide-react";

export default function InsightsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getInsights()
      .then((res) => {
        setData(res);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "instant" });
      })
      .catch(() => {
        setError("Failed to load insights. Ensure backend is running.");
        setLoading(false);
      });
  }, []);

  const summaryStats = [
    {
      title: "Features Analyzed",
      value: "11",
      icon: TrendingUp,
      color: "blue",
    },
    { title: "Model Type", value: "XGBoost", icon: Brain, color: "green" },
    { title: "Accuracy", value: "72.11%", icon: Target, color: "purple" },
    { title: "AUC Score", value: "0.79", icon: LineChart, color: "yellow" },
  ];

  const performanceMetrics = [
    {
      label: "Accuracy",
      value: "72.11%",
      progress: 72.11,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Precision",
      value: "69.74%",
      progress: 69.74,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Recall",
      value: "77.08%",
      progress: 77.08,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "F1-Score",
      value: "73.20%",
      progress: 73.2,
      color: "from-cyan-500 to-cyan-600",
    },
  ];


  const keyInsights = [
    "Model trained on 68,565 cleaned patient records after preprocessing and validation",
    "The Trained model captures complex non-linear relationships in medical data",
    "Recall-optimized decision threshold (0.40) reduces missed high-risk patients during screening",
    "Final model prioritizes medical safety by minimizing false negatives (FN) over raw accuracy"
  ];


  const modelComparison = [
    {
      model: "Logistic Regression (Weighted)",
      accuracy: "72.08%",
      recall: "66.46%",
      precision: "74.39%",
    },
    {
      model: "Random Forest",
      accuracy: "72.61%",
      recall: "67.89%",
      precision: "74.49%",
    },
    {
      model: "Gradient Boosting (0.5)",
      accuracy: "72.77%",
      recall: "67.80%",
      precision: "74.81%",
    },
    {
      model: "Gradient Boosting (0.40)",
      accuracy: "72.11%",
      recall: "77.08%",
      precision: "69.74%",
    },
  ];

  const techStack = [
    {
      name: "XGBoost",
      description: "Gradient boosting for predictive modeling",
      icon: Cpu,
      color: "black border border-blue-400/30 ",
    },
    {
      name: "SHAP",
      description: "Model interpretability and feature importance",
      icon: Brain,
      color: "black border border-blue-400/30 ",
    },
    {
      name: "Next.js 14",
      description: "React framework for frontend interface",
      icon: Code2,
      color: "black border border-blue-400/30 ",
    },
    {
      name: "FastAPI",
      description: "High-performance backend API services",
      icon: Server,
      color: "black border border-blue-400/30 ",
    },
    {
      name: "Scikit-learn",
      description: "Machine learning preprocessing and metrics",
      icon: Layers,
      color: "black border border-blue-400/30 ",
    },
    {
      name: "Pandas/ NumPy",
      description: "Data manipulation and numerical computing",
      icon: BarChart3,
      color: "black border border-blue-400/30 ",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="glass-card p-12 rounded-2xl text-center">
            <Loader2 className="w-16 h-16 text-blue-400 animate-spin mx-auto" />
            <p className="text-gray-400 text-lg mt-6">
              Loading comprehensive model insights...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Analyzing feature importance and performance metrics
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Hero Header */}
        <div className="glass-card p-8 md:p-10 rounded-2xl animate-fadeIn">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl">
                <BarChart3 className="w-10 h-10 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  AI Model Insights Dashboard
                </h1>
                <p className="text-gray-400 text-base md:text-lg max-w-2xl">
                  Comprehensive analysis of cardiovascular risk prediction model
                  with transparent explainability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-full">
              <HeartPulse className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">
                Medical AI
              </span>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="glass-card border-red-500/50 bg-red-500/10 p-6 rounded-2xl animate-fadeIn">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-200 font-medium">
                  Failed to load insights
                </p>
                <p className="text-red-300/80 text-sm mt-1">
                  Please ensure the backend server is running on port 8000
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {summaryStats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "text-blue-400 bg-blue-500/10",
              green: "text-green-400 bg-green-500/10",
              purple: "text-purple-400 bg-purple-500/10",
              yellow: "text-yellow-400 bg-yellow-500/10",
            };

            return (
              <div
                key={index}
                className="glass-card p-5 md:p-6 rounded-xl hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    {/* <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {stat.value}
                    </p> */}
                    <p
                      className={`font-bold text-white ${
                        stat.title === "Model Type"
                          ? "text-lg sm:text-xl md:text-xl" 
                          : "text-xl sm:text-2xl md:text-3xl" 
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-2 sm:p-3 rounded-lg flex items-center justify-center
                              ${
                                colorClasses[
                                  stat.color as keyof typeof colorClasses
                                ]
                              }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Performance Metrics */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Performance Metrics */}
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">
                  Model Performance
                </h2>
              </div>

              <div className="space-y-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm md:text-base text-gray-300">
                        {metric.label}
                      </span>
                      <span className="text-sm md:text-base font-semibold text-white">
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${metric.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-300 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>
                    Recall optimized for medical screening to minimize false
                    negatives
                  </span>
                </p>
              </div>
            </div>

            {/* Feature Importance */}
            {data?.feature_importance && (
              <div className="glass-card p-6 md:p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Model Feature Importance Analysis
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Relative contribution (%) of each feature to cardiovascular
                  risk prediction
                </p>

                <FeatureImportanceChart importance={data.feature_importance} />
              </div>
            )}
          </div>

          {/* Right Column - Insights & Comparison */}
          <div className="space-y-6 md:space-y-8">
            {/* Key Insights */}
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-9">
                <Brain className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Key Insights</h2>
              </div>

              <ul className="space-y-4">
                {keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-sm md:text-base text-gray-300 group-hover:text-gray-200 transition-colors">
                      {insight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Model Comparison */}
            <div className="glass-card p-6 md:p-8 rounded-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Model Comparison
                </h2>
                <p className="text-gray-400 text-sm">
                  Performance across different algorithms and thresholds
                </p>
              </div>

              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">
                        Model
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-gray-400">
                        Accuracy
                      </th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-gray-400">
                        Recall
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelComparison.map((model, index) => (
                      <tr
                        key={index}
                        className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                          index === 3 ? "bg-green-500/10" : ""
                        }`}
                      >
                        <td className="py-3 px-2 text-sm text-white font-medium">
                          {model.model}
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-300 text-right">
                          {model.accuracy}
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-300 text-right">
                          {model.recall}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                <p className="text-xs text-green-300">
                  <span className="font-semibold">Selected Model :</span>{" "}
                  Gradient Boosting with 0.40 threshold for optimal recall
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project & Technology Stack Section */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* About Project */}
          <div className="glass-card p-6 md:p-8 rounded-2xl ">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                About This Project
              </h2>
            </div>

            <h3 className="font-bold text-xl text-white mb-4">
              Purpose & Mission
            </h3>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-6">
              This cardiovascular risk predictor demonstrates how AI can assist
              in preventive healthcare by providing early risk assessments. The
              system emphasizes explainability to build trust and understanding
              among healthcare professionals while maintaining high predictive
              accuracy.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-white mb-2">
                  Clinical Value
                </h4>
                <p className="text-sm text-gray-300">
                  • Early detection of high-risk patients for preventive
                  interventions
                  <br />
                  {/* • Reduction of unnecessary invasive tests through accurate
                  screening */}
                  <br />• Support for clinical decision-making with
                  interpretable AI
                </p>
              </div>

              <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-white mb-2">
                  Contribution
                </h4>
                <p className="text-sm text-gray-300">
                  • Blood pressure (systolic and diastolic) is the strongest predictor of cardiovascular disease
                  <br />
                  • Age and BMI are major secondary contributors to heart disease risk
                  <br />
                  • Cholesterol and glucose levels significantly increase risk when elevated
                  <br />
                  • Lifestyle factors such as smoking, alcohol intake, and physical inactivity moderately influence predictions
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Technology Stack
              </h2>
            </div>

            <p className="text-gray-300 text-base mb-6">
              This project leverages a modern, scalable technology stack
              designed for high-performance medical AI applications.
            </p>


            {/* Mobile Friendly Tech Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={index}
                    className={`glass-card ${tech.color} p-4 rounded-xl transition-all hover:scale-[1.03] cursor-pointer flex flex-col`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-md flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-white text-sm break-words min-w-0">
                        {tech.name}
                      </h3>
                    </div>

                    <p className="text-white/90 text-xs break-words">
                      {tech.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <p className="text-sm text-purple-300">
                <span className="font-semibold">Architecture :</span> Modular
                design with clear separation between data processing, modeling,
                and serving layers for maintainability and scalability.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="glass-card p-6 border-l-4 border-yellow-500/50 bg-yellow-500/5 rounded-xl">
          <div className="flex items-start gap-4">
            <ShieldAlert className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-200 mb-2">
                Medical AI Disclaimer
              </h3>
              <p className="text-sm text-yellow-100/90">
                This predictive model is designed for educational and research
                purposes only. It should not replace professional medical
                advice, diagnosis, or treatment. Always consult with qualified
                healthcare providers for medical decisions.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
