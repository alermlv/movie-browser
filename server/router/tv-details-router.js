import express from "express";
import { getDetailsData } from "../services/details-service.js";
import {
  readDetailsParams,
  validateDetailsParams,
} from "../utilities/validators.js";
import { asyncHandler } from "../middleware/error-handler.js";

export const tvDetailsRouter = express.Router({ mergeParams: true });

tvDetailsRouter.get(
  "/",
  asyncHandler(async function handleGetTvDetails(request, response) {
    const detailsParams = readDetailsParams({
      type: "tv",
      id: request.params.id,
    });

    validateDetailsParams(detailsParams);

    const data = await getDetailsData(detailsParams);

    response.json(data);
  }),
);
