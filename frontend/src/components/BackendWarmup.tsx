"use client";

import { useEffect } from "react";
import { API_BASE } from "@/lib/api";

export default function BackendWarmup() {
  useEffect(() => {
    fetch(`${API_BASE}/healthz`).catch(() => {
      // silently ignore
    });
  }, []);

  return null;
}
