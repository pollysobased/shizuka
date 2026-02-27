"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePlayerStore } from "@/lib/store/playerStore";
import { cn } from "@/lib/cn";

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface TopBarProps {
  visible: boolean;
}

export function TopBar({ visible }: TopBarProps) {
  const { sidebarOpen, setSidebarOpen, filters } = usePlayerStore();

  const activeCount =
    filters.weather.length +
    filters.time.length +
    filters.season.length +
    filters.environment.length +
    filters.prefecture.length;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between"
        >
          {/* title */}
          <span className="text-white/80 text-sm tracking-widest font-light">shizuka</span>

          {/* filter button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl text-xs",
              "backdrop-blur-xl transition-all duration-150",
              sidebarOpen || activeCount > 0
                ? "bg-white text-black"
                : "bg-black/30 text-white/50 hover:text-white hover:bg-black/50"
            )}
          >
            <FilterIcon />
            <span>filters</span>
            {activeCount > 0 && (
              <span className={cn(
                "rounded-md px-1 text-[10px] tabular-nums",
                sidebarOpen ? "bg-black/20" : "bg-black/20"
              )}>
                {activeCount}
              </span>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
