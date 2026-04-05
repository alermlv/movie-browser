export const TMDB_TYPE = {
  MOVIE: "movie",
  TV: "tv",
};

export const TMDB_PATHS = {
  TRENDING_MOVIES: "/trending/movie/week",
  TRENDING_TV: "/trending/tv/week",

  NOW_PLAYING_MOVIES: "/movie/now_playing",
  ON_THE_AIR_TV: "/tv/on_the_air",

  TOP_RATED_MOVIES: "/movie/top_rated",
  TOP_RATED_TV: "/tv/top_rated",

  UPCOMING_MOVIES: "/movie/upcoming",

  GENRES: (type) => `/genre/${type}/list`,
  DISCOVER: (type) => `/discover/${type}`,
  DETAIL: (type, id) => `/${type}/${id}`,
};
