export function normalizeHomeSection(sectionConfig, results) {
  return {
    title: sectionConfig.title,
    type: sectionConfig.type,
    items: results.map(normalizeSearchResult).filter(Boolean),
  };
}

export function normalizeSearchResult(item) {
  const type = readItemType(item);

  if (!type) {
    return null;
  }

  return {
    id: item.id,
    type,
    title: item.title || item.name || "",
    posterPath: item.poster_path || "",
    backdropPath: item.backdrop_path || "",
    releaseDate: item.release_date || item.first_air_date || "",
    voteAverage: Number(item.vote_average || 0),
    genreIds: Array.isArray(item.genre_ids) ? item.genre_ids : [],
  };
}

export function normalizeDetailsItem(type, item) {
  return {
    id: item.id,
    type,
    title: item.title || item.name || "",
    posterPath: item.poster_path || "",
    backdropPath: item.backdrop_path || "",
    overview: item.overview || "",
    releaseDate: item.release_date || item.first_air_date || "",
    voteAverage: Number(item.vote_average || 0),
    voteCount: Number(item.vote_count || 0),
    runtime: Number(item.runtime || 0),
    genres: Array.isArray(item.genres) ? item.genres.map(normalizeGenre) : [],
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
  return {
    id: genre.id,
    name: genre.name || "",
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
