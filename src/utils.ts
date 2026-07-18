import { GRADIENT_STOPS } from "./constants";
import type { BgType } from "./constants";

const STAGE_LABELS: [string[], string][] = [
  [["fetch", "download"],    "Downloading AI model"],
  [["compile", "wasm"],      "Compiling engine"],
  [["inference", "predict"], "Analyzing image"],
  [["process", "apply", "mask", "transparency"], "Removing background"],
];

export function getFriendlyStageLabel(raw: string): string {
  if (!raw) return "Getting things ready...";
  const lower = raw.toLowerCase();
  const match = STAGE_LABELS.find(([keys]) => keys.some((k) => lower.includes(k)));
  return match ? match[1] : "Creating magic";
}


const MAX_INFERENCE_DIMENSION = 1024;


export async function resizeImageBlob(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const longest = Math.max(w, h);


      if (longest <= MAX_INFERENCE_DIMENSION) {
        URL.revokeObjectURL(img.src);
        resolve(blob);
        return;
      }

      const scale = MAX_INFERENCE_DIMENSION / longest;
      const newW = Math.round(w * scale);
      const newH = Math.round(h * scale);

      const canvas = document.createElement("canvas");
      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(img.src);
        resolve(blob); // fallback to original
        return;
      }


      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, newW, newH);

      URL.revokeObjectURL(img.src);

      canvas.toBlob(
        (resized) => {
          if (resized) {
            resolve(resized);
          } else {
            resolve(blob); // fallback
          }
        },
        "image/png",
        1.0
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image for resizing"));
    };

    img.src = URL.createObjectURL(blob);
  });
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
