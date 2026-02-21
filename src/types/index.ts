import { z } from "zod";

export const VideoTagsSchema = z.object({
  weather: z.array(z.enum(["rain", "snow", "storm", "clear", "fog", "overcast"])),
  time: z.array(z.enum(["morning", "day", "evening", "night"])),
  season: z.array(z.enum(["spring", "summer", "autumn", "winter"])),
  environment: z.array(
    z.enum([
      "city",
      "shrine",
      "temple",
      "shopping",
      "countryside",
      "alley",
      "station",
      "park",
      "river",
      "market",
    ])
  ),
  prefecture: z.array(z.string()),
  locations: z.array(z.string()),
});

export type VideoTags = z.infer<typeof VideoTagsSchema>;

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  thumbnail: z.string(),
  duration: z.string().optional(),
  publishedAt: z.string(),
  tags: VideoTagsSchema,
  channelId: z.string(),
});

export type Video = z.infer<typeof VideoSchema>;

export const VibePreset = z.object({
  id: z.string(),
  label: z.string(),
  filters: z.object({
    weather: z.array(z.string()).optional(),
    time: z.array(z.string()).optional(),
    season: z.array(z.string()).optional(),
    environment: z.array(z.string()).optional(),
    prefecture: z.array(z.string()).optional(),
  }),
});

export type VibePreset = z.infer<typeof VibePreset>;

export interface ActiveFilters {
  weather: string[];
  time: string[];
  season: string[];
  environment: string[];
  prefecture: string[];
  search: string;
}

export interface PlayerState {
  currentIndex: number;
  isPlaying: boolean;
  playlist: Video[];
  volume: number;
  isMuted: boolean;
}
