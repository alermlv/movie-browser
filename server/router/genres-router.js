import express from "express";
import { getGenresData } from "../services/genres-service.js";
import { readGenresParams, validateGenresParams } from "../utils/validators.js";
import { asyncHandler } from "../middleware/error-handler.js";

export const genresRouter = express.Router();

genresRouter.get(
  "/",
  asyncHandler(async function handleGetGenres(request, response) {
    const genresParams = readGenresParams(request.query);

    validateGenresParams(genresParams);

    const data = await getGenresData(genresParams);

    response.json(data);
  }),
);
