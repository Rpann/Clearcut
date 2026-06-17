import { GRADIENT_STOPS } from "./constants";
import type { BgType } from "./constants";

const STAGE_LABELS: [string[], string][] = [
  [["fetch", "download"], "Getting things ready"],
  [["compile", "wasm"],   "Almost there"],
  [["inference", "predict", "process", "apply", "mask", "transparency"], "Creating awesomeness"],
];

export function getFriendlyStageLabel(raw: string): string {
  if (!raw) return "Getting things ready...";
  const lower = raw.toLowerCase();
  const match = STAGE_LABELS.find(([keys]) => keys.some((k) => lower.includes(k)));
  return match ? match[1] : "Creating magic";
}

export function downloadImage(
  resultImageUrl: string,
  bgType: BgType,
  bgColor: string,
  gradientPreset: string
): void {
  if (bgType === "transparent") {
    const link = document.createElement("a");
    link.href = resultImageUrl;
    link.download = `clearcut-transparent-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (bgType === "color") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (bgType === "gradient") {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const stops = GRADIENT_STOPS[gradientPreset] ?? ["#ffffff", "#f1f5f9"];
      gradient.addColorStop(0, stops[0]);
      gradient.addColorStop(1, stops[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `clearcut-bg-replaced-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  img.src = resultImageUrl;
}
