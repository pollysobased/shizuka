"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { YouTubePlayer } from "@/components/player/YouTubePlayer";
import { PlayerControls } from "@/components/player/PlayerControls";
import { TopBar } from "@/components/ui/TopBar";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { ActiveFiltersBar } from "@/components/filters/ActiveFiltersBar";
import { useVideos } from "@/hooks/useVideos";
import { usePlayerStore } from "@/lib/store/playerStore";

export function Scene() {
  const { isLoading } = useVideos();
  const { playlist, sidebarOpen } = usePlayerStore();
  const [uiVisible, setUiVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showUI = useCallback(() => {
    setUiVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!sidebarOpen) setUiVisible(false);
    }, 3000);
  }, [sidebarOpen]);

  useEffect(() => {
    showUI();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [showUI]);

  // keep ui visible when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      setUiVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    } else {
      showUI();
    }
  }, [sidebarOpen, showUI]);

  return (
    <div
      className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden"
      onMouseMove={showUI}
      onMouseEnter={showUI}
    >
      {/* video */}
      {playlist.length > 0 && !isLoading && <YouTubePlayer />}

      {/* dark vignette edges */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)"
        }}
      />

      {/* loading */}
      <AnimatePresence>{isLoading && <LoadingOverlay />}</AnimatePresence>

      {/* top bar */}
      <TopBar visible={uiVisible} />

      {/* active filter chips */}
      <ActiveFiltersBar visible={uiVisible} />

      {/* controls */}
      <PlayerControls visible={uiVisible} />

      {/* sidebar */}
      <Sidebar open={sidebarOpen} />
    </div>
  );
}
