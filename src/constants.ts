export const SAMPLES = [
  {
    id: "portrait",
    name: "Portrait",
    url: "/Sample Image 1.jpg",
    desc: "Finely-detailed hair edges",
  },
  {
    id: "dog",
    name: "Cute Pet",
    url: "/Sample Image 2.jpg",
    desc: "Soft fur and whiskers",
  },
  {
    id: "food",
    name: "Food",
    url: "/Sample Image 3.jpg",
    desc: "Clean product shot",
  },
  {
    id: "man",
    name: "Man",
    url: "/Sample Image 4.jpg",
    desc: "Sharp portrait edges",
  },
];

export const PRESET_COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Off White", value: "#F5F5F5" },
  { name: "Midnight", value: "#171717" },
  { name: "Navy", value: "#1E293B" },
  { name: "Sky", value: "#DBEAFE" },
  { name: "Mint", value: "#D1FAE5" },
  { name: "Lavender", value: "#EDE9FE" },
  { name: "Blush", value: "#FCE7F3" },
];

export const PRESET_GRADIENTS = [
  { name: "Sunrise Rose", label: "sunrise", value: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)" },
  { name: "Ocean Breeze", label: "ocean", value: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)" },
  { name: "Neon Mint", label: "neon-mint", value: "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)" },
  { name: "Sunset Glow", label: "sunset-glow", value: "linear-gradient(135deg, #FA709A 0%, #FEE140 100%)" },
  { name: "Arctic Sky", label: "arctic-sky", value: "linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)" },
  { name: "Deep Space", label: "deep-space", value: "linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243E 100%)" },
];

// Maps gradient label to [startColor, endColor] for canvas export
export const GRADIENT_STOPS: Record<string, [string, string]> = {
  sunrise: ["#FF9A9E", "#FECFEF"],
  ocean: ["#667EEA", "#764BA2"],
  "neon-mint": ["#43E97B", "#38F9D7"],
  "sunset-glow": ["#FA709A", "#FEE140"],
  "arctic-sky": ["#A1C4FD", "#C2E9FB"],
  "deep-space": ["#0F0C29", "#24243E"],
};

export type ViewMode = "compare" | "side-by-side" | "result";
export type BgType = "transparent" | "color" | "gradient";
