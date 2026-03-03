"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePlayerStore } from "@/lib/store/playerStore";
import { filterVideos, hasActiveFilters } from "@/lib/store/filterLogic";
import { getCachedVideos, setCachedVideos } from "@/lib/cache";
import { getSeedVideos } from "@/lib/youtube/seed";
import type { Video } from "@/types";

async function loadVideos(): Promise<Video[]> {
  const cached = getCachedVideos();
  if (cached && cached.length > 0) return cached;

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  if (apiKey) {
    try {
      const { fetchAllChannelVideos } = await import("@/lib/youtube/api");
      const videos = await fetchAllChannelVideos(apiKey, 18);
      if (videos.length > 0) {
        setCachedVideos(videos);
        return videos;
      }
    } catch (e) {
      console.warn("yt api failed, using seed data:", e);
    }
  }

  const seed = getSeedVideos();
  setCachedVideos(seed);
  return seed;
}

export function useVideos() {
  const { setAllVideos, setPlaylist, allVideos, filters } = usePlayerStore();

  const query = useQuery({
    queryKey: ["videos"],
    queryFn: loadVideos,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (query.data) {
      setAllVideos(query.data);
    }
  }, [query.data, setAllVideos]);

  useEffect(() => {
    if (allVideos.length === 0) return;
    const filtered = hasActiveFilters(filters)
      ? filterVideos(allVideos, filters)
      : allVideos;
    setPlaylist(filtered.length > 0 ? filtered : allVideos);
  }, [allVideos, filters, setPlaylist]);

  return query;
}
