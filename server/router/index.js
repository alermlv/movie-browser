import express from "express";

export const router = express.Router();

router.get("/health", (request, response) => {
  response.json({
    ok: true,
    service: "movie-browser-api",
  });
});
