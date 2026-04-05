import { homeConfig } from "../config/home-config.js";
import { getTmdb } from "./tmdb-client.js";

export async function getHomeData() {
  const sections = await fetchHomeSections();

  return { sections };
}

async function fetchHomeSections() {
  const entries = await Promise.all(
    homeConfig.map(async function fetchSection(sectionConfig) {
      const data = await getTmdb(sectionConfig.path);

      return [
        sectionConfig.key,
        data.results || [],
      ];
    }),
  );

  return Object.fromEntries(entries);
}
