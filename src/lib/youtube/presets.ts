import type { VibePreset } from "@/types";

export const vibePresets: VibePreset[] = [
  {
    id: "rainy-tokyo",
    label: "rainy tokyo",
    filters: {
      weather: ["rain"],
      prefecture: ["tokyo"],
    },
  },
  {
    id: "night-walk",
    label: "night walk",
    filters: {
      time: ["night"],
    },
  },
  {
    id: "snowy-streets",
    label: "snowy streets",
    filters: {
      weather: ["snow"],
    },
  },
  {
    id: "quiet-neighborhood",
    label: "quiet neighborhood",
    filters: {
      environment: ["alley"],
    },
  },
  {
    id: "shrine-walk",
    label: "shrine walk",
    filters: {
      environment: ["shrine", "temple"],
    },
  },
  {
    id: "autumn-kyoto",
    label: "autumn kyoto",
    filters: {
      season: ["autumn"],
      prefecture: ["kyoto"],
    },
  },
];
