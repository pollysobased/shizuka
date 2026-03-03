"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePlayerStore } from "@/lib/store/playerStore";
import { FilterPill } from "../filters/FilterPill";
import { vibePresets } from "@/lib/youtube/presets";
import { cn } from "@/lib/cn";

const weatherOptions = [
  { value: "rain", label: "rain" },
  { value: "snow", label: "snow" },
  { value: "storm", label: "storm" },
  { value: "fog", label: "fog" },
  { value: "overcast", label: "overcast" },
  { value: "clear", label: "clear" },
];

const timeOptions = [
  { value: "morning", label: "morning" },
  { value: "day", label: "day" },
  { value: "evening", label: "evening" },
  { value: "night", label: "night" },
];

const seasonOptions = [
  { value: "spring", label: "spring" },
  { value: "summer", label: "summer" },
  { value: "autumn", label: "autumn" },
  { value: "winter", label: "winter" },
];

const envOptions = [
  { value: "city", label: "city" },
  { value: "shrine", label: "shrine" },
  { value: "temple", label: "temple" },
  { value: "shopping", label: "shopping" },
  { value: "alley", label: "alley" },
  { value: "station", label: "station" },
  { value: "park", label: "park" },
  { value: "river", label: "river" },
  { value: "countryside", label: "countryside" },
];

const prefectureOptions = [
  { value: "tokyo", label: "tokyo" },
  { value: "osaka", label: "osaka" },
  { value: "kyoto", label: "kyoto" },
  { value: "hokkaido", label: "hokkaido" },
  { value: "fukuoka", label: "fukuoka" },
  { value: "aichi", label: "aichi" },
  { value: "kanagawa", label: "kanagawa" },
  { value: "nara", label: "nara" },
  { value: "hiroshima", label: "hiroshima" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2">{children}</p>
  );
}

interface SidebarProps {
  open: boolean;
}

export function Sidebar({ open }: SidebarProps) {
  const { filters, setFilter, clearFilters, activePreset, setActivePreset, applyPresetFilters, playlist, setSidebarOpen } =
    usePlayerStore();

  const hasFilters =
    filters.weather.length > 0 ||
    filters.time.length > 0 ||
    filters.season.length > 0 ||
    filters.environment.length > 0 ||
    filters.prefecture.length > 0;

  function applyPreset(preset: (typeof vibePresets)[number]) {
    if (activePreset === preset.id) {
      clearFilters();
      setActivePreset(null);
    } else {
      applyPresetFilters(preset.filters as never);
      setActivePreset(preset.id);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30"
            onClick={() => setSidebarOpen(false)}
          />

          {/* panel */}
          <motion.aside
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -16, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed left-4 top-4 bottom-4 z-40",
              "w-64 bg-[#111] rounded-2xl",
              "flex flex-col overflow-hidden"
            )}
          >
            {/* header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
              <span className="text-white/50 text-xs">filters</span>
              <div className="flex items-center gap-3">
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-white/30 text-xs hover:text-white/60 transition-colors"
                  >
                    clear
                  </button>
                )}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white/30 hover:text-white/60 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5 scrollbar-none">
              {/* result count */}
              <div className="text-white/25 text-xs">
                {playlist.length} video{playlist.length !== 1 ? "s" : ""}
              </div>

              {/* vibe presets */}
              <div>
                <SectionLabel>vibes</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {vibePresets.map((preset) => (
                    <FilterPill
                      key={preset.id}
                      label={preset.label}
                      active={activePreset === preset.id}
                      onClick={() => applyPreset(preset)}
                    />
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <SectionLabel>weather</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {weatherOptions.map((o) => (
                    <FilterPill
                      key={o.value}
                      label={o.label}
                      active={filters.weather.includes(o.value)}
                      onClick={() => setFilter("weather", o.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>time</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {timeOptions.map((o) => (
                    <FilterPill
                      key={o.value}
                      label={o.label}
                      active={filters.time.includes(o.value)}
                      onClick={() => setFilter("time", o.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>season</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {seasonOptions.map((o) => (
                    <FilterPill
                      key={o.value}
                      label={o.label}
                      active={filters.season.includes(o.value)}
                      onClick={() => setFilter("season", o.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>environment</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {envOptions.map((o) => (
                    <FilterPill
                      key={o.value}
                      label={o.label}
                      active={filters.environment.includes(o.value)}
                      onClick={() => setFilter("environment", o.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>prefecture</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {prefectureOptions.map((o) => (
                    <FilterPill
                      key={o.value}
                      label={o.label}
                      active={filters.prefecture.includes(o.value)}
                      onClick={() => setFilter("prefecture", o.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
