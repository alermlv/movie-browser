import express from "express";
import { homeRouter } from "./home-router.js";

export const router = express.Router();

router.get("/health", (request, response) => {
  response.json({
    ok: true,
    service: "movie-browser-api",
  });
});

router.use("/home", homeRouter);
