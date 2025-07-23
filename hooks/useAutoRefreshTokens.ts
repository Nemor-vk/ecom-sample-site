// hooks/useAutoRefreshSession.ts
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function useAutoRefreshSession() {
  const { update } = useSession();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        update(); // Refresh when tab becomes active
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [update]);
}