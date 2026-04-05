import express from "express";
import { homeRouter } from "./home-router.js";
import { detailsRouter } from "./details-router.js";

export const router = express.Router();

router.get("/health", handleHealthCheck);
router.use("/home", homeRouter);
router.use("/details", detailsRouter);

function handleHealthCheck(request, response) {
  response.json({
    ok: true,
    service: "movie-browser-api",
  });
}
