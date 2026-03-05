"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayerStore } from "@/lib/store/playerStore";
import { cn } from "@/lib/cn";

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5 3.5L13 8L5 12.5V3.5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="4" y="3" width="3" height="10" rx="1" fill="currentColor" />
      <rect x="9" y="3" width="3" height="10" rx="1" fill="currentColor" />
    </svg>
  );
}

function SkipNextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 3.5L10.5 8L4 12.5V3.5Z" fill="currentColor" />
      <rect x="11" y="3" width="1.5" height="10" rx="0.75" fill="currentColor" />
    </svg>
  );
}

function SkipPrevIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M12 3.5L5.5 8L12 12.5V3.5Z" fill="currentColor" />
      <rect x="3.5" y="3" width="1.5" height="10" rx="0.75" fill="currentColor" />
    </svg>
  );
}

function VolumeMuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2.5L4.5 5.5H2v5h2.5L8 13.5V2.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none" />
      <path d="M11 6l2 4M13 6l-2 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function VolumeLowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2.5L4.5 5.5H2v5h2.5L8 13.5V2.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none" />
      <path d="M10 6.5a2 2 0 010 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function VolumeHighIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2.5L4.5 5.5H2v5h2.5L8 13.5V2.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="none" />
      <path d="M10.5 5.5a3 3 0 010 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M12.5 4a5.5 5.5 0 010 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function VolumeSlider({ volume, isMuted, onChange }: { volume: number; isMuted: boolean; onChange: (v: number) => void }) {
  const effective = isMuted ? 0 : volume;
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePointer = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

    onChange(Math.round((x / rect.width) * 100));
  };

  return (
    <div
      ref={trackRef}
      className="relative flex items-center w-20 h-4 cursor-pointer group/slider"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); handlePointer(e); }}
      onPointerMove={(e) => { if (e.buttons === 1) handlePointer(e); }}
    >
      <div className="w-full h-0.5 rounded-full bg-white/10 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-white/50 rounded-full transition-all duration-100"
          style={{ width: `${effective}%` }}
        />
      </div>
    </div>
  );
}

interface ControlsProps {
  visible: boolean;
}

export function PlayerControls({ visible }: ControlsProps) {
  const { isPlaying, isMuted, volume, playlist, currentIndex, skipNext, skipPrev, setPlaying, toggleMute, setVolume } =
    usePlayerStore();

  const current = playlist[currentIndex];
  const effectiveVolume = isMuted ? 0 : volume;

  function getVolumeIcon() {
    if (isMuted || effectiveVolume === 0) return <VolumeMuteIcon />;
    if (effectiveVolume < 50) return <VolumeLowIcon />;
    return <VolumeHighIcon />;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4 pointer-events-auto">
            {/* video title */}
            <AnimatePresence mode="wait">
              {current && (
                <motion.p
                  key={current.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-white/50 text-xs tracking-wide max-w-sm text-center truncate px-4"
                >
                  {current.title.toLowerCase()}
                </motion.p>
              )}
            </AnimatePresence>

            {/* controls bar */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl rounded-2xl px-4 py-3">
              <button
                onClick={skipPrev}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-white/50 hover:text-white transition-colors duration-150"
              >
                <SkipPrevIcon />
              </button>

              <button
                onClick={() => setPlaying(!isPlaying)}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-white hover:text-white/80 transition-colors duration-150"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button
                onClick={skipNext}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-white/50 hover:text-white transition-colors duration-150"
              >
                <SkipNextIcon />
              </button>

              <div className="w-px h-4 bg-white/10 mx-1" />

              <button
                onClick={toggleMute}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-xl transition-colors duration-150 flex-shrink-0",
                  isMuted || effectiveVolume === 0 ? "text-white/25" : "text-white/50 hover:text-white"
                )}
              >
                {getVolumeIcon()}
              </button>

              <VolumeSlider
                volume={volume}
                isMuted={isMuted}
                onChange={(v) => setVolume(v)}
              />

              {playlist.length > 0 && (
                <>
                  <div className="w-px h-4 bg-white/10 mx-1" />
                  <span className="text-white/30 text-xs tabular-nums">
                    {currentIndex + 1} / {playlist.length}
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

