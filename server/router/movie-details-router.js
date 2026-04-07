import express from "express";
import { getDetailsData } from "../services/details-service.js";
import {
  readDetailsParams,
  validateDetailsParams,
} from "../utils/validators.js";
import { asyncHandler } from "../middleware/error-handler.js";

export const movieDetailsRouter = express.Router({ mergeParams: true });

movieDetailsRouter.get(
  "/",
  asyncHandler(async function handleGetMovieDetails(request, response) {
    const detailsParams = readDetailsParams({
      type: "movie",
      id: request.params.id,
    });

    validateDetailsParams(detailsParams);

    const data = await getDetailsData(detailsParams);

    response.json(data);
  }),
);
