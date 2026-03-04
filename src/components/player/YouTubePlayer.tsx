"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePlayerStore } from "@/lib/store/playerStore";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  setVolume(v: number): void;
  loadVideoById(id: string): void;
  destroy(): void;
  getPlayerState(): number;
}

export function YouTubePlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const readyRef = useRef(false);
  const { playlist, currentIndex, isPlaying, isMuted, volume, playlistVersion, skipNext, setPlaying } =
    usePlayerStore();

  const currentVideo = playlist[currentIndex];

  const initPlayer = useCallback(() => {
    if (!containerRef.current || !currentVideo) return;

    if (playerRef.current) {
      playerRef.current.destroy();
      readyRef.current = false;
    }

    // origin param helps suppress some yt ui overlays
    const origin = typeof window !== "undefined" ? window.location.origin : "";

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: currentVideo.id,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        iv_load_policy: 3,
        disablekb: 1,
        playsinline: 1,
        showinfo: 0,
        cc_load_policy: 0,
        origin,
      },
      events: {
        onReady: (e: { target: YouTubePlayer }) => {
          readyRef.current = true;
          if (isMuted) {
            e.target.mute();
          } else {
            e.target.unMute();
            e.target.setVolume(volume);
          }
          e.target.playVideo();
        },
        onStateChange: (e: { data: number }) => {
          if (e.data === 0) skipNext();
          if (e.data === 1) setPlaying(true);
          if (e.data === 2) setPlaying(false);
        },
      },
    } as never) as YouTubePlayer;
  }, [currentVideo, isMuted, volume, skipNext, setPlaying]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.YT?.Player) {
      initPlayer();
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = initPlayer;
    document.head.appendChild(tag);

    return () => {
      playerRef.current?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (playerRef.current && currentVideo && readyRef.current) {
      playerRef.current.loadVideoById(currentVideo.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo?.id, playlistVersion]);

  useEffect(() => {
    if (!playerRef.current || !readyRef.current) return;
    isPlaying ? playerRef.current.playVideo() : playerRef.current.pauseVideo();
  }, [isPlaying]);

  useEffect(() => {
    if (!playerRef.current || !readyRef.current) return;
    if (isMuted) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
    }
  }, [isMuted, volume]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: "-60px", bottom: "-60px" }}
      >
        <div ref={containerRef} className="w-full h-full" id="yt-player" />
      </div>
      {/* block mouse events that would reveal yt ui */}
      <div className="absolute inset-0 z-10" />
    </div>
  );
}

