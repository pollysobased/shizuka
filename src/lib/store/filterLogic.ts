import Fuse from "fuse.js";
import type { Video, ActiveFilters } from "@/types";

export function filterVideos(videos: Video[], filters: ActiveFilters): Video[] {
  let results = videos;

  if (filters.weather.length > 0) {
    results = results.filter((v) =>
      filters.weather.some((w) => v.tags.weather.includes(w as never))
    );
  }

  if (filters.time.length > 0) {
    results = results.filter((v) =>
      filters.time.some((t) => v.tags.time.includes(t as never))
    );
  }

  if (filters.season.length > 0) {
    results = results.filter((v) =>
      filters.season.some((s) => v.tags.season.includes(s as never))
    );
  }

  if (filters.environment.length > 0) {
    results = results.filter((v) =>
      filters.environment.some((e) => v.tags.environment.includes(e as never))
    );
  }

  if (filters.prefecture.length > 0) {
    results = results.filter((v) =>
      filters.prefecture.some(
        (p) =>
          v.tags.prefecture.includes(p) ||
          v.tags.locations.includes(p) ||
          v.title.toLowerCase().includes(p)
      )
    );
  }

  if (filters.search.trim()) {
    const fuse = new Fuse(results, {
      keys: ["title", "description", "tags.locations", "tags.prefecture"],
      threshold: 0.4,
    });
    results = fuse.search(filters.search).map((r) => r.item);
  }

  return results;
}

export function hasActiveFilters(filters: ActiveFilters): boolean {
  return (
    filters.weather.length > 0 ||
    filters.time.length > 0 ||
    filters.season.length > 0 ||
    filters.environment.length > 0 ||
    filters.prefecture.length > 0 ||
    filters.search.trim().length > 0
  );
}
