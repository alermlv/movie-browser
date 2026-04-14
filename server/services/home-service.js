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
      const sectionParams = resolveSectionParams(sectionConfig);
      const sectionQuery = resolveSectionQuery(sectionConfig);

      try {
        const data = await getTmdb(sectionConfig.path, sectionParams);

        return [
          sectionConfig.key,
          normalizeHomeSection(sectionConfig, data.results || [], sectionQuery),
        ];
      } catch {
        return [
          sectionConfig.key,
          normalizeHomeSection(sectionConfig, [], sectionQuery),
        ];
      }
    }),
  );

  return Object.fromEntries(entries);
}

function resolveSectionParams(sectionConfig) {
  return resolveSectionOption(sectionConfig.params);
}

function resolveSectionQuery(sectionConfig) {
  const query = resolveSectionOption(sectionConfig.query);

  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return null;
  }

  const normalizedQuery = Object.fromEntries(
    Object.entries(query)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      )
      .map(([key, value]) => [key, String(value)]),
  );

  return Object.keys(normalizedQuery).length ? normalizedQuery : null;
}

function resolveSectionOption(option) {
  if (typeof option === "function") {
    return option();
  }

  if (option && typeof option === "object" && !Array.isArray(option)) {
    return option;
  }

  return {};
}
