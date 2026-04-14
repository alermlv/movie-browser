import { homeConfig } from "../config/home-config.js";
import { getTmdb } from "./tmdb-client.js";
import { normalizeHomeSection } from "../utilities/normalize-tmdb.js";

export async function getHomeData() {
  const sections = await fetchHomeSections();
  return { sections };
}

async function fetchHomeSections() {
  const entries = await Promise.all(
    homeConfig.map(async (sectionConfig) => {
      try {
        const data = await getTmdb(sectionConfig.path);

        return [
          sectionConfig.key,
          normalizeHomeSection(sectionConfig, data.results || []),
        ];
      } catch {
        return [sectionConfig.key, []];
      }
    }),
  );

  return Object.fromEntries(entries);
}
