import type { Video } from "@/types";
import { parseVideoTags } from "@/lib/parser/tagParser";

// these are all random for now
// TODO: look up for real ids
const seed = [
  { id: "ogfSaOHMM_U", title: "Tokyo, Shinjuku night walk, rain" },
  { id: "Pk6bZLZbV2k", title: "Tokyo, Shibuya scramble crossing walk, rainy night" },
  { id: "oXcGFNJDAEU", title: "Kyoto, Gion evening walk" },
  { id: "u3hNBbH0DnY", title: "Osaka, Dotonbori night walk" },
  { id: "aEVMRCRGqO4", title: "Sapporo, snowfall city walk winter night" },
  { id: "xFxLh6n3-Zs", title: "Tokyo, Harajuku morning walk" },
  { id: "BSXHOO6VGQQ", title: "Kyoto, Arashiyama autumn walk" },
  { id: "LoI0vUz2rDA", title: "Tokyo, Yanaka alley walk daytime" },
  { id: "5iRmDk1Jf3U", title: "Osaka, Namba shopping street rainy evening" },
  { id: "3jqD0gY6rPg", title: "Tokyo, Shimokitazawa alley walk" },
  { id: "byoqQm0bBzU", title: "Kyoto, Fushimi Inari shrine walk morning" },
  { id: "oJiRpJisuT4", title: "Nikko, Toshogu temple autumn walk" },
  { id: "c7uqzHkmO9E", title: "Tokyo, Asakusa temple walk morning" },
  { id: "LqZmOTH2gW4", title: "Tokyo, Akihabara night walk rain" },
  { id: "a0YBwnvh53g", title: "Kamakura, temple walk spring cherry blossom" },
  { id: "FMuUm2lJRNw", title: "Hokkaido, Sapporo winter snow walk day" },
  { id: "Q2v2xvWHHg4", title: "Fukuoka, Hakata station area evening walk" },
  { id: "4-ZJYF-ZFXE", title: "Osaka, Umeda city walk night" },
  { id: "F_7FfZ7pgEU", title: "Tokyo, Nakameguro river walk evening" },
  { id: "aNJGqCYLz4g", title: "Tokyo, Koenji shopping street afternoon" },
  { id: "M3jXB5yGDIg", title: "Kyoto, Nishiki market morning walk" },
  { id: "LoaFTmFuCqY", title: "Tokyo, Ginza city walk rainy night" },
  { id: "1qU6fqLWGBo", title: "Yokohama, riverside walk evening" },
  { id: "OKEIBsS0NtI", title: "Nara, deer park and temple walk morning spring" },
  { id: "FrBwSRdNBao", title: "Kanazawa, higashi chaya alley walk" },
  { id: "k_7LEKAfbpA", title: "Sendai, city walk rainy evening" },
  { id: "Ix2MbMqZ0os", title: "Tokyo, Shinjuku walk morning commute" },
  { id: "YJrNJhkBFa4", title: "Osaka, Shinsekai night walk" },
  { id: "sKHBH5w5ACg", title: "Kyoto, Pontocho alley night walk" },
  { id: "xCBi0SBETUE", title: "Tokyo, Omotesando morning walk spring" },
  { id: "3t3Fd5oB-NA", title: "Tokyo, Ikebukuro station night rain" },
  { id: "4MgJGu4pQJw", title: "Kyoto, Arashiyama bamboo grove morning" },
  { id: "GhKqd0O3RXo", title: "Osaka, Shinbashi evening alley walk" },
  { id: "qNWqE6ZbDC8", title: "Tokyo, Ueno park walk spring sakura" },
  { id: "VzXpbQlKlGM", title: "Sapporo, Susukino night walk winter" },
  { id: "F_tbQMhiZjY", title: "Hiroshima, city center walk day" },
  { id: "FUYSSuqL_tU", title: "Kyoto, Kiyomizudera temple walk autumn" },
  { id: "aGWYzl_bCFw", title: "Tokyo, Daikanyama walk afternoon" },
  { id: "1ANFNDe3mVo", title: "Osaka, Tennoji evening walk" },
  { id: "V3z8kUSCz_M", title: "Tokyo, Kagurazaka evening walk rain" },
];

export function getSeedVideos(): Video[] {
  return seed.map(({ id, title }) => ({
    id,
    title,
    description: "",
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    publishedAt: "2023-01-01T00:00:00Z",
    channelId: "UCAcsAE1tpLuP3y7UhxUoWpQ",
    tags: parseVideoTags(title, ""),
  }));
}
