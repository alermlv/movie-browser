import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  TMDB_BASE_URL: process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3",
};
