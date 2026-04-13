import { TMDB_TYPE, TMDB_PATHS } from "./tmdb-config.js";
import { 
  firstDayOfPrevMonth,
  lastDayOfPrevMonth,
  firstDayOfLastYear,
  lastDayOfLastYear,
  today,
} from "../utilities/date-range.js";


export const homeConfig = [
  {
    key: "trendingMovies",
    title: "Trending Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.TRENDING_MOVIES,
  },
  {
    key: "trendingTv",
    title: "Trending TV Shows",
    type: TMDB_TYPE.TV,
    path: TMDB_PATHS.TRENDING_TV,
  },
  {
    key: "topMoviesLastMonth",
    title: "Top Movies Last Month",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.MOVIE),
    params: () => ({
      "primary_release_date.gte": firstDayOfPrevMonth,
      "primary_release_date.lte": lastDayOfPrevMonth,
      sort_by: "popularity.desc",
    }),
  },
  {
    key: "topTvLastMonth",
    title: "Top TV Shows Last Month",
    type: TMDB_TYPE.TV,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.TV),
    params: () => ({
      "first_air_date.gte": firstDayOfPrevMonth,
      "first_air_date.lte": lastDayOfPrevMonth,
      sort_by: "popularity.desc",
    }),
  },
  {
    key: "nowPlayingMovies",
    title: "Now Playing Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.NOW_PLAYING_MOVIES,
  },
  {
    key: "onTheAirTv",
    title: "On The Air TV Shows",
    type: TMDB_TYPE.TV,
    path: TMDB_PATHS.ON_THE_AIR_TV,
  },
  {
    key: "topMoviesLastYear",
    title: "Top Movies Last Year",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.MOVIE),
    params: () => ({
      "primary_release_date.gte": firstDayOfLastYear,
      "primary_release_date.lte": lastDayOfLastYear,
      sort_by: "vote_average.desc",
      "vote_count.gte": 200,
    }),
  },
  {
    key: "topTvLastYear",
    title: "Top TV Shows Last Year",
    type: TMDB_TYPE.TV,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.TV),
    params: () => ({
      "first_air_date.gte": firstDayOfLastYear,
      "first_air_date.lte": lastDayOfLastYear,
      sort_by: "vote_average.desc",
      "vote_count.gte": 100,
    }),
  },
  {
    key: "topRatedMovies",
    title: "Top Rated Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.TOP_RATED_MOVIES,
  },
  {
    key: "topRatedTv",
    title: "Top Rated TV Shows",
    type: TMDB_TYPE.TV,
    path: TMDB_PATHS.TOP_RATED_TV,
  },
  {
    key: "actionMovies",
    title: "Action Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.MOVIE),
    params: () => ({
      with_genres: 28,
      sort_by: "popularity.desc",
    }),
  },
  {
    key: "comedyMovies",
    title: "Comedy Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.MOVIE),
    params: () => ({
      with_genres: 35,
      sort_by: "popularity.desc",
    }),
  },
  {
    key: "scifiMovies",
    title: "Sci-Fi Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.MOVIE),
    params: () => ({
      with_genres: 878,
      sort_by: "popularity.desc",
    }),
  },
  {
    key: "dramaTv",
    title: "Drama TV Shows",
    type: TMDB_TYPE.TV,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.TV),
    params: () => ({
      with_genres: 18,
      sort_by: "popularity.desc",
    }),
  },
  {
    key: "upcomingMovies",
    title: "Upcoming Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.UPCOMING_MOVIES,
  },
  {
    key: "upcomingAnimatedMovies",
    title: "Upcoming Animated Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.MOVIE),
    params: () => ({
      with_genres: 16,
      "primary_release_date.gte": today,
      sort_by: "popularity.desc",
    }),
  },
  {
    key: "topRatedAnimatedMovies",
    title: "Top Rated Animated Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.MOVIE),
    params: () => ({
      with_genres: 16,
      "vote_average.gte": 7,
      "vote_count.gte": 100,
      sort_by: "vote_average.desc",
    }),
  },
  {
    key: "kidsAnimatedMovies",
    title: "Kids Animated Movies",
    type: TMDB_TYPE.MOVIE,
    path: TMDB_PATHS.DISCOVER(TMDB_TYPE.MOVIE),
    params: () => ({
      with_genres: 16,
      certification_country: "US",
      "certification.lte": "G",
      sort_by: "popularity.desc",
    }),
  },
];
