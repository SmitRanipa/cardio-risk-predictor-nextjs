"use client";
import { useState, useEffect } from "react";
import { predictRisk, getInsights } from "@/lib/api";
import RiskChart from "./RiskChart";
import { Heart, Loader2, AlertCircle } from "lucide-react";
import SelectField from "./CustomSelectField";
import { speakRisk } from "@/lib/speak";
import { useRef } from "react";
import DisclaimerCard from "./DisclaimerCard";
import ToggleCard from "./ToggleCard";

/* ===============================
   Types
================================ */
// interface PredictionResult {
//   probability: number;
//   risk_label: string;
//   shap_values: Record<string, number>;
// }

interface PredictionResult {
  probability: number;
  risk_label: string;
}

type FieldErrors = Record<string, string>;

/* ===============================
   Reusable Inputs
================================ */
interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  error?: string;
}

const FEATURE_LABELS: Record<string, string> = {
  ap_hi: "Systolic Blood Pressure",
  ap_lo: "Diastolic Blood Pressure",
  cholesterol: "Cholesterol Level",
  gluc: "Glucose Level",
  bmi: "Body Mass Index (BMI)",
  gender: "Gender",
  age_in_years: "Age (Years)",
  height: "Height",
  weight: "Weight",
  smoke: "Smoking",
  alco: "Alcohol Intake",
  active: "Physical Activity",
};

const InputField = ({
  label,
  name,
  type = "number",
  value,
  onChange,
  placeholder,
  min,
  max,
  required = true,
  error,
}: InputFieldProps) => (
  <div className="form-group">
    <label htmlFor={name} className="input-label">
      {label} {required && <span className="text-red-400">*</span>}
    </label>

    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      required={required}
      className={`custom-input transition-all
        border border-white/20 bg-black/20 rounded-xl px-4 py-3 text-white placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20
        ${error ? "border-red-500/60 ring-2 ring-red-500/30" : ""}
      `}
    />

    {error && (
      <p className="text-sm text-red-400 mt-1 animate-fadeIn">{error}</p>
    )}
  </div>
);

/* ===============================
   Main Component
================================ */
export default function PredictForm() {
  const [form, setForm] = useState({
    age: "",
    gender: "1",
    height: "",
    weight: "",
    ap_hi: "",
    ap_lo: "",
    cholesterol: "1",
    gluc: "1",
    smoke: "0",
    alco: "0",
    active: "0",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [featureImportance, setFeatureImportance] = useState<Record<
    string,
    number
  > | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  /* ===============================
     🔊 VOICE EFFECT
  ================================ */
  useEffect(() => {
    if (result) {
      speakRisk(result.probability, result.risk_label);
    }
  }, [result]);

  /* ===============================
     Change Handler + Validation
  ================================ */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      const systolic = Number(updatedForm.ap_hi);
      const diastolic = Number(updatedForm.ap_lo);

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };

        // Number min/max validation
        if (
          e.target instanceof HTMLInputElement &&
          e.target.type === "number"
        ) {
          const min = e.target.min ? Number(e.target.min) : undefined;
          const max = e.target.max ? Number(e.target.max) : undefined;
          const num = Number(value);

          let message = "";
          if (value !== "") {
            if (min !== undefined && num < min) message = `Must be ≥ ${min}`;
            if (max !== undefined && num > max) message = `Must be ≤ ${max}`;
          }
          newErrors[name] = message;
        }

        // BP relationship validation
        if (updatedForm.ap_hi && updatedForm.ap_lo && diastolic >= systolic) {
          newErrors.ap_lo = "Diastolic BP must be lower than Systolic BP";
        } else {
          if (
            newErrors.ap_lo === "Diastolic BP must be lower than Systolic BP"
          ) {
            newErrors.ap_lo = "";
          }
        }

        return newErrors;
      });

      return updatedForm;
    });
  };

  /* ===============================
     Submit Handler
  ================================ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const insights = await getInsights();
    setFeatureImportance(insights.feature_importance);

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) {
      setError("Please fix the highlighted fields");
      setLoading(false);
      return;
    }

    const payload = {
      age: parseInt(form.age),
      gender: parseInt(form.gender),
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      ap_hi: parseInt(form.ap_hi),
      ap_lo: parseInt(form.ap_lo),
      cholesterol: parseInt(form.cholesterol),
      gluc: parseInt(form.gluc),
      smoke: parseInt(form.smoke),
      alco: parseInt(form.alco),
      active: parseInt(form.active),
    };

    try {
      const data = await predictRisk(payload);
      setResult(data);

      // 🔹 Smooth scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      setError("Prediction failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     JSX
  ================================ */
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="glass-card p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">👤 Personal</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Age"
                name="age"
                value={form.age}
                onChange={handleChange}
                min={18}
                max={100}
                error={errors.age}
                placeholder="e.g., 45"
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gender
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <ToggleCard
                    label="Female"
                    icon="👩"
                    active={form.gender === "1"}
                    onToggle={() =>
                      setForm((prev) => ({
                        ...prev,
                        gender: "1",
                      }))
                    }
                  />

                  <ToggleCard
                    label="Male"
                    icon="👨"
                    active={form.gender === "2"}
                    onToggle={() =>
                      setForm((prev) => ({
                        ...prev,
                        gender: "2",
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Physical */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">📏 Physical</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Height (cm)"
                name="height"
                placeholder="e.g., 165 cm"
                value={form.height}
                onChange={handleChange}
                min={120}
                max={220}
                error={errors.height}
              />
              <InputField
                label="Weight (kg)"
                name="weight"
                placeholder="e.g., 70 kg"
                value={form.weight}
                onChange={handleChange}
                min={30}
                max={200}
                error={errors.weight}
              />
            </div>
          </div>

          {/* Medical */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">💉 Medical</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <InputField
                label="Systolic BP"
                name="ap_hi"
                placeholder="e.g., 120"
                value={form.ap_hi}
                onChange={handleChange}
                min={70}
                max={240}
                error={errors.ap_hi}
              />
              <InputField
                label="Diastolic BP"
                name="ap_lo"
                placeholder="e.g., 80"
                value={form.ap_lo}
                onChange={handleChange}
                min={40}
                max={150}
                error={errors.ap_lo}
              />
              <SelectField
                label="Cholesterol"
                name="cholesterol"
                value={form.cholesterol}
                onChange={handleChange}
                options={[
                  { value: "1", label: "Normal" },
                  { value: "2", label: "Above Normal" },
                  { value: "3", label: "High" },
                ]}
              />
              <SelectField
                label="Glucose"
                name="gluc"
                value={form.gluc}
                onChange={handleChange}
                options={[
                  { value: "1", label: "Normal" },
                  { value: "2", label: "Above Normal" },
                  { value: "3", label: "High" },
                ]}
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">🏃 Lifestyle</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Smoking */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Smoking
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <ToggleCard
                    label="No Smoker"
                    icon="🚭"
                    active={form.smoke === "0"}
                    onToggle={() =>
                      setForm((prev) => ({ ...prev, smoke: "0" }))
                    }
                  />
                  <ToggleCard
                    label="Smoker"
                    icon="🚬"
                    active={form.smoke === "1"}
                    onToggle={() =>
                      setForm((prev) => ({ ...prev, smoke: "1" }))
                    }
                  />
                </div>
              </div>

              {/* Alcohol */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Alcohol Intake
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <ToggleCard
                    label="No"
                    icon="🚫"
                    active={form.alco === "0"}
                    onToggle={() => setForm((prev) => ({ ...prev, alco: "0" }))}
                  />
                  <ToggleCard
                    label="Yes"
                    icon="🍺"
                    active={form.alco === "1"}
                    onToggle={() => setForm((prev) => ({ ...prev, alco: "1" }))}
                  />
                </div>
              </div>

              {/* Physical Activity */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Physically Active
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <ToggleCard
                    label="Inactive"
                    icon="🛋️"
                    active={form.active === "0"}
                    onToggle={() =>
                      setForm((prev) => ({ ...prev, active: "0" }))
                    }
                  />
                  <ToggleCard
                    label="Active"
                    icon="🏃"
                    active={form.active === "1"}
                    onToggle={() =>
                      setForm((prev) => ({ ...prev, active: "1" }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="glass-card border-red-500/40 bg-red-500/10 p-4 flex gap-3">
              <AlertCircle className="text-red-400" />
              <p className="text-red-200">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn glass-card w-full flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Heart />
                Analyze Risk
              </>
            )}
          </button>
        </form>
      </div>

      {result && (
        <div ref={resultRef} className="mt-12 space-y-8 animate-fadeIn">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Risk Probability */}
            <div className="glass-card p-6">
              <h3 className="text-2xl font-bold mb-6">
                Risk Assessment Results
              </h3>

              <div className="text-center mb-6">
                <p className="text-gray-400 mb-2">Risk Probability</p>
                <p className="text-5xl font-bold text-white">
                  {(result.probability * 100).toFixed(1)}%
                </p>
              </div>

              <RiskChart probability={result.probability} />
            </div>

            {/* Top Risk Factors */}
            {featureImportance && (
              <div className="glass-card p-6">
                <h3 className="text-2xl font-bold mb-10">
                  Top Contributing Risk Factors
                </h3>

                <div className="space-y-4">
                  {Object.entries(featureImportance)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([feature, value]) => (
                      <div
                        key={feature}
                        className="glass-card p-4 border-white/10"
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">
                            {FEATURE_LABELS[feature] ??
                              feature.replace(/_/g, " ")}
                          </p>
                          <span className="text-red-400 font-bold">
                            {(value * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 