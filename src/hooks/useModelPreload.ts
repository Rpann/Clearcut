import { useState, useEffect, useRef } from "react";
import { preload } from "@imgly/background-removal";
import type { Config } from "@imgly/background-removal";

interface UseModelPreloadResult {
  isModelReady: boolean;
  preloadError: string | null;
}


export function useModelPreload(config: Partial<Config>): UseModelPreloadResult {
  const [isModelReady, setIsModelReady] = useState(false);
  const [preloadError, setPreloadError] = useState<string | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {

    if (hasStarted.current) return;
    hasStarted.current = true;


    const timer = setTimeout(() => {
      preload(config as Config)
        .then(() => {
          setIsModelReady(true);
          if (config.debug) {
            console.log("[Clearcut] Model + WASM preloaded and cached ✓");
          }
        })
        .catch((err) => {

          console.warn("[Clearcut] Model preload failed (will retry on demand):", err);
          setPreloadError(err?.message || "Preload failed");
        });
    }, 800);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { isModelReady, preloadError };
}
