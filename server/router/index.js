import express from "express";
import { homeRouter } from "./home-router.js";
import { searchRouter } from "./search-router.js";
import { movieDetailsRouter } from "./movie-details-router.js";
import { tvDetailsRouter } from "./tv-details-router.js";
import { genresRouter } from "./genres-router.js";

export const router = express.Router();

router.get("/health", handleHealthCheck);
router.use("/home", homeRouter);
router.use("/movie/:id", movieDetailsRouter);
router.use("/tv/:id", tvDetailsRouter);
router.use("/search", searchRouter);
router.use("/genres", genresRouter);

function handleHealthCheck(request, response) {
  response.json({ ok: true });
}
