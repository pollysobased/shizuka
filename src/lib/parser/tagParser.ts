import type { VideoTags } from "@/types";

const weatherKeywords: Record<string, VideoTags["weather"][number]> = {
  rain: "rain",
  rainy: "rain",
  raining: "rain",
  drizzle: "rain",
  snow: "snow",
  snowy: "snow",
  snowfall: "snow",
  snowing: "snow",
  blizzard: "snow",
  storm: "storm",
  stormy: "storm",
  typhoon: "storm",
  fog: "fog",
  foggy: "fog",
  mist: "fog",
  misty: "fog",
  overcast: "overcast",
  cloudy: "overcast",
  clouds: "overcast",
};

const timeKeywords: Record<string, VideoTags["time"][number]> = {
  morning: "morning",
  dawn: "morning",
  sunrise: "morning",
  "early morning": "morning",
  noon: "day",
  afternoon: "day",
  daytime: "day",
  "day time": "day",
  midday: "day",
  evening: "evening",
  dusk: "evening",
  sunset: "evening",
  night: "night",
  nighttime: "night",
  "night time": "night",
  midnight: "night",
  "late night": "night",
};

const seasonKeywords: Record<string, VideoTags["season"][number]> = {
  spring: "spring",
  sakura: "spring",
  "cherry blossom": "spring",
  "cherry blossoms": "spring",
  summer: "summer",
  autumn: "autumn",
  fall: "autumn",
  "autumn leaves": "autumn",
  foliage: "autumn",
  koyo: "autumn",
  winter: "winter",
};

const environmentKeywords: Record<string, VideoTags["environment"][number]> = {
  shrine: "shrine",
  jinja: "shrine",
  "shinto shrine": "shrine",
  temple: "temple",
  ji: "temple",
  dera: "temple",
  "shopping street": "shopping",
  shotengai: "shopping",
  arcade: "shopping",
  mall: "shopping",
  market: "market",
  countryside: "countryside",
  rural: "countryside",
  alley: "alley",
  narrow: "alley",
  "back street": "alley",
  yokocho: "alley",
  station: "station",
  "train station": "station",
  eki: "station",
  park: "park",
  garden: "park",
  river: "river",
  riverbank: "river",
  canal: "river",
  city: "city",
  urban: "city",
  downtown: "city",
  "city walk": "city",
};

const prefectureList = [
  "tokyo",
  "osaka",
  "kyoto",
  "aichi",
  "fukuoka",
  "hokkaido",
  "kanagawa",
  "saitama",
  "chiba",
  "hyogo",
  "shizuoka",
  "hiroshima",
  "okinawa",
  "nara",
  "nagano",
  "niigata",
  "miyagi",
  "okayama",
  "kumamoto",
  "kagoshima",
  "nagasaki",
  "iwate",
  "aomori",
  "akita",
  "yamagata",
  "fukushima",
  "ibaraki",
  "tochigi",
  "gunma",
  "toyama",
  "ishikawa",
  "fukui",
  "yamanashi",
  "gifu",
  "mie",
  "shiga",
  "tottori",
  "shimane",
  "yamaguchi",
  "tokushima",
  "kagawa",
  "ehime",
  "kochi",
  "saga",
  "oita",
  "miyazaki",
];

const locationKeywords: Record<string, string> = {
  shibuya: "shibuya",
  shinjuku: "shinjuku",
  harajuku: "harajuku",
  akihabara: "akihabara",
  asakusa: "asakusa",
  ueno: "ueno",
  ginza: "ginza",
  ikebukuro: "ikebukuro",
  shimokitazawa: "shimokitazawa",
  nakameguro: "nakameguro",
  yanaka: "yanaka",
  koenji: "koenji",
  kagurazaka: "kagurazaka",
  daikanyama: "daikanyama",
  omotesando: "omotesando",
  hachioji: "hachioji",
  namba: "namba",
  dotonbori: "dotonbori",
  umeda: "umeda",
  gion: "gion",
  arashiyama: "arashiyama",
  fushimi: "fushimi",
  pontocho: "pontocho",
  nishiki: "nishiki",
  sapporo: "sapporo",
  susukino: "susukino",
  fukuoka: "fukuoka",
  tenjin: "tenjin",
  nakasu: "nakasu",
  hakata: "hakata",
  hiroshima: "hiroshima",
  sendai: "sendai",
  nara: "nara",
  kamakura: "kamakura",
  nikko: "nikko",
  hakone: "hakone",
  yokohama: "yokohama",
  kawasaki: "kawasaki",
  kobe: "kobe",
  nagoya: "nagoya",
  matsuyama: "matsuyama",
  kanazawa: "kanazawa",
};

function dedupe<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function parseVideoTags(title: string, description = ""): VideoTags {
  const text = `${title} ${description}`.toLowerCase();

  const weather: VideoTags["weather"] = [];
  const time: VideoTags["time"] = [];
  const season: VideoTags["season"] = [];
  const environment: VideoTags["environment"] = [];
  const prefecture: string[] = [];
  const locations: string[] = [];

  for (const [keyword, value] of Object.entries(weatherKeywords)) {
    if (text.includes(keyword)) weather.push(value);
  }

  for (const [keyword, value] of Object.entries(timeKeywords)) {
    if (text.includes(keyword)) time.push(value);
  }

  for (const [keyword, value] of Object.entries(seasonKeywords)) {
    if (text.includes(keyword)) season.push(value);
  }

  for (const [keyword, value] of Object.entries(environmentKeywords)) {
    if (text.includes(keyword)) environment.push(value);
  }

  for (const pref of prefectureList) {
    if (text.includes(pref)) prefecture.push(pref);
  }

  for (const [keyword, value] of Object.entries(locationKeywords)) {
    if (text.includes(keyword)) locations.push(value);
  }

  return {
    weather: dedupe(weather),
    time: dedupe(time),
    season: dedupe(season),
    environment: dedupe(environment),
    prefecture: dedupe(prefecture),
    locations: dedupe(locations),
  };
}
