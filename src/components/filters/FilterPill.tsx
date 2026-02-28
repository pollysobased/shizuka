"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "relative px-3 py-1.5 rounded-lg text-xs transition-all duration-150",
        "select-none cursor-pointer",
        active
          ? "bg-white text-black"
          : "bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10"
      )}
    >
      {label}
    </motion.button>
  );
}
