import { create } from "zustand";
import type { Video, ActiveFilters } from "@/types";

interface PlayerStore {
  currentIndex: number;
  isPlaying: boolean;
  playlist: Video[];
  allVideos: Video[];
  isMuted: boolean;
  volume: number;
  playlistVersion: number;
  filters: ActiveFilters;
  activePreset: string | null;
  sidebarOpen: boolean;

  setAllVideos: (videos: Video[]) => void;
  setPlaylist: (videos: Video[]) => void;
  setCurrentIndex: (idx: number) => void;
  skipNext: () => void;
  skipPrev: () => void;
  setPlaying: (playing: boolean) => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  setFilter: (key: keyof Omit<ActiveFilters, "search">, value: string) => void;
  setSearch: (q: string) => void;
  clearFilters: () => void;
  setActivePreset: (id: string | null) => void;
  applyPresetFilters: (filters: Partial<ActiveFilters>) => void;
  setSidebarOpen: (open: boolean) => void;
}

const emptyFilters: ActiveFilters = {
  weather: [],
  time: [],
  season: [],
  environment: [],
  prefecture: [],
  search: "",
};

export const usePlayerStore = create<PlayerStore>()(
  (set, get) => ({
      currentIndex: 0,
      isPlaying: true,
      playlist: [],
      allVideos: [],
      isMuted: false,
      volume: 80,
      playlistVersion: 0,
      filters: emptyFilters,
      activePreset: null,
      sidebarOpen: false,

      setAllVideos: (videos) => set({ allVideos: videos }),

      setPlaylist: (videos) =>
        set((s) => ({ playlist: videos, currentIndex: 0, playlistVersion: s.playlistVersion + 1 })),

      setCurrentIndex: (idx) => set({ currentIndex: idx }),

      skipNext: () => {
        const { currentIndex, playlist } = get();
        if (playlist.length === 0) return;
        set({ currentIndex: (currentIndex + 1) % playlist.length });
      },

      skipPrev: () => {
        const { currentIndex, playlist } = get();
        if (playlist.length === 0) return;
        set({
          currentIndex: (currentIndex - 1 + playlist.length) % playlist.length,
        });
      },

      setPlaying: (playing) => set({ isPlaying: playing }),
      toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
      setVolume: (v) => set({ volume: v, isMuted: v === 0 }),

      setFilter: (key, value) => {
        const current = get().filters[key] as string[];
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        set((s) => ({
          filters: { ...s.filters, [key]: next },
          activePreset: null,
        }));
      },

      setSearch: (q) =>
        set((s) => ({ filters: { ...s.filters, search: q } })),

      clearFilters: () =>
        set({ filters: emptyFilters, activePreset: null }),

      setActivePreset: (id) => set({ activePreset: id }),

      applyPresetFilters: (filters) => {
        set({
          filters: {
            ...emptyFilters,
            ...filters,
          },
        });
      },

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
  })
);
