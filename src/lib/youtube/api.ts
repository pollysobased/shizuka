import { parseVideoTags } from "@/lib/parser/tagParser";
import type { Video } from "@/types";

// rambalac's channel id
const RAMBALAC_CHANNEL_ID = "UCAcsAE1tpLuP3y7UhxUoWpQ";

export interface YTPlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    resourceId: { videoId: string };
    thumbnails: {
      medium?: { url: string };
      high?: { url: string };
      standard?: { url: string };
    };
  };
}

export interface YTChannelResponse {
  items: Array<{
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }>;
}

export interface YTPlaylistResponse {
  nextPageToken?: string;
  items: YTPlaylistItem[];
}

export async function fetchChannelUploadsPlaylistId(apiKey: string): Promise<string> {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${RAMBALAC_CHANNEL_ID}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`channels api error: ${res.status}`);
  const data: YTChannelResponse = await res.json();
  return data.items[0].contentDetails.relatedPlaylists.uploads;
}

export async function fetchPlaylistPage(
  playlistId: string,
  apiKey: string,
  pageToken?: string
): Promise<YTPlaylistResponse> {
  const params = new URLSearchParams({
    part: "snippet",
    playlistId,
    maxResults: "50",
    key: apiKey,
    ...(pageToken ? { pageToken } : {}),
  });
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`playlistitems api error: ${res.status}`);
  return res.json();
}

export function mapPlaylistItemToVideo(item: YTPlaylistItem): Video {
  const videoId = item.snippet.resourceId.videoId;
  const thumbnail =
    item.snippet.thumbnails.standard?.url ||
    item.snippet.thumbnails.high?.url ||
    item.snippet.thumbnails.medium?.url ||
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return {
    id: videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail,
    publishedAt: item.snippet.publishedAt,
    channelId: RAMBALAC_CHANNEL_ID,
    tags: parseVideoTags(item.snippet.title, item.snippet.description),
  };
}

// fetch all videos from channel, stops at maxPages
export async function fetchAllChannelVideos(apiKey: string, maxPages = 10): Promise<Video[]> {
  const playlistId = await fetchChannelUploadsPlaylistId(apiKey);
  const videos: Video[] = [];
  let pageToken: string | undefined;
  let page = 0;

  while (page < maxPages) {
    const data = await fetchPlaylistPage(playlistId, apiKey, pageToken);
    for (const item of data.items) {
      videos.push(mapPlaylistItemToVideo(item));
    }
    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
    page++;
  }

  return videos;
}
