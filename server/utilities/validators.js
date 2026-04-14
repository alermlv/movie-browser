const ALLOWED_SEARCH_TYPES = new Set(["movie", "tv", "all"]);
const ALLOWED_GENRES_TYPES = new Set(["movie", "tv", "all"]);
const ALLOWED_DETAIL_TYPES = new Set(["movie", "tv"]);

export function readSearchParams(query) {
  return {
    q: readString(query.q),
    type: readString(query.type) || "all",
    page: readPositiveInteger(query.page, 1),
    sort: readString(query.sort) || "popularity.desc",
    genreIds: readString(query.genreIds),
    yearFrom: readString(query.yearFrom),
    yearTo: readString(query.yearTo),
    ratingFrom: readString(query.ratingFrom),
    ratingTo: readString(query.ratingTo),
  };
}

export function validateSearchParams(searchParams) {
  if (!ALLOWED_SEARCH_TYPES.has(searchParams.type)) {
    throw createBadRequestError("Invalid search type.");
  }

  if (searchParams.page < 1) {
    throw createBadRequestError("Invalid page.");
  }

  if (
    searchParams.ratingFrom &&
    searchParams.ratingTo &&
    Number(searchParams.ratingFrom) > Number(searchParams.ratingTo)
  ) {
    throw createBadRequestError("Invalid rating range.");
  }

  if (
    searchParams.yearFrom &&
    searchParams.yearTo &&
    searchParams.yearFrom > searchParams.yearTo
  ) {
    throw createBadRequestError("Invalid year range.");
  }
}

export function readDetailsParams(params) {
  return {
    type: readString(params.type),
    id: readString(params.id),
  };
}

export function validateDetailsParams(detailsParams) {
  if (!ALLOWED_DETAIL_TYPES.has(detailsParams.type)) {
    throw createBadRequestError("Invalid details type.");
  }

  if (!detailsParams.id) {
    throw createBadRequestError("Details id is required.");
  }
}

export function readGenresParams(query) {
  return {
    type: readString(query.type) || "all",
  };
}

export function validateGenresParams(genresParams) {
  if (!ALLOWED_GENRES_TYPES.has(genresParams.type)) {
    throw createBadRequestError("Invalid genres type.");
  }
}

function readString(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function readPositiveInteger(value, fallbackValue) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    return fallbackValue;
  }

  return number;
}

function createBadRequestError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}
