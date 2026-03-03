import type { Video } from "@/types";

const CACHE_KEY = "shizuka-videos-cache";
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

interface CacheEntry {
  videos: Video[];
  timestamp: number;
}

export function getCachedVideos(): Video[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return entry.videos;
  } catch {
    return null;
  }
}

export function setCachedVideos(videos: Video[]): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry = { videos, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // storage quota or similar
  }
}
