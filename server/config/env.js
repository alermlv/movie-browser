import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 3000),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5500",
  TMDB_API_BASE_URL: process.env.TMDB_API_BASE_URL || "https://api.themoviedb.org/3",
  TMDB_API_TOKEN: process.env.TMDB_API_TOKEN || "",
};

validateEnv();

function validateEnv() {
  if (!env.TMDB_API_TOKEN) {
    throw new Error("TMDB_API_TOKEN is required.");
  }
}
