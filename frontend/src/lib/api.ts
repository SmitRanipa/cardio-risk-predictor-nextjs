// export const API_BASE = "http://localhost:8000";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function predictRisk(payload: any) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Prediction failed");
  }

  return res.json();
}

export async function getInsights() {
  const res = await fetch(`${API_BASE}/insights`);

  if (!res.ok) {
    throw new Error("Failed to fetch insights");
  }

  return res.json();
}
