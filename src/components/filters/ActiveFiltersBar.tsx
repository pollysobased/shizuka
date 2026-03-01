"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePlayerStore } from "@/lib/store/playerStore";

interface TagChipProps {
  label: string;
  onRemove: () => void;
}

function TagChip({ label, onRemove }: TagChipProps) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1 text-white/60 text-xs"
    >
      {label}
      <button
        onClick={onRemove}
        className="text-white/30 hover:text-white/70 transition-colors"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      </button>
    </motion.span>
  );
}

interface ActiveFiltersBarProps {
  visible: boolean;
}

export function ActiveFiltersBar({ visible }: ActiveFiltersBarProps) {
  const { filters, setFilter } = usePlayerStore();

  const chips = [
    ...filters.weather.map((v) => ({ key: `weather-${v}`, label: v, remove: () => setFilter("weather", v) })),
    ...filters.time.map((v) => ({ key: `time-${v}`, label: v, remove: () => setFilter("time", v) })),
    ...filters.season.map((v) => ({ key: `season-${v}`, label: v, remove: () => setFilter("season", v) })),
    ...filters.environment.map((v) => ({ key: `env-${v}`, label: v, remove: () => setFilter("environment", v) })),
    ...filters.prefecture.map((v) => ({ key: `pref-${v}`, label: v, remove: () => setFilter("prefecture", v) })),
  ];

  if (chips.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="absolute top-16 left-4 right-4 z-20 flex flex-wrap gap-1.5"
        >
          {chips.map((chip) => (
            <TagChip key={chip.key} label={chip.label} onRemove={chip.remove} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
