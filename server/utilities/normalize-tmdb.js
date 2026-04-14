export function normalizeHomeSection(sectionConfig, results, query = null) {
  return {
    title: sectionConfig.title,
    type: sectionConfig.type,
    query,
    items: results.map(normalizeSearchResult).filter(Boolean),
  };
}

export function normalizeSearchResult(item) {
  const type = readItemType(item);
  const id = String(item?.id || "").trim();

  if (!type || !id) {
    return null;
  }

  return {
    id,
    type,
    title: item.title || item.name || "",
    posterPath: item.poster_path || "",
    backdropPath: item.backdrop_path || "",
    releaseDate: item.release_date || item.first_air_date || "",
    voteAverage: Number(item.vote_average || 0),
    genreIds: Array.isArray(item.genre_ids)
      ? item.genre_ids.map((genreId) => String(genreId))
      : [],
  };
}

export function normalizeDetailsItem(type, item) {
  const id = String(item?.id || "").trim();

  return {
    id,
    type,
    title: item.title || item.name || "",
    posterPath: item.poster_path || "",
    backdropPath: item.backdrop_path || "",
    overview: item.overview || "",
    releaseDate: item.release_date || item.first_air_date || "",
    voteAverage: Number(item.vote_average || 0),
    voteCount: Number(item.vote_count || 0),
    runtime:
      Number(item.runtime || 0) ||
      Number(
        Array.isArray(item.episode_run_time) ? item.episode_run_time[0] : 0,
      ),
    genres: Array.isArray(item.genres)
      ? item.genres.map(normalizeGenre).filter(Boolean)
      : [],
  };
}

export function normalizeGenresMap(genres) {
  return Object.fromEntries(
    genres
      .filter((genre) => genre && genre.id && genre.name)
      .map((genre) => [String(genre.id), genre.name]),
  );
}

function normalizeGenre(genre) {
  const id = String(genre?.id || "").trim();
  const name = genre?.name || "";

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,
  };
}

function readItemType(item) {
  if (item.media_type === "movie" || item.media_type === "tv") {
    return item.media_type;
  }

  if (item.title) {
    return "movie";
  }

  if (item.name) {
    return "tv";
  }

  return "";
}
