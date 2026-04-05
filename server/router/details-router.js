import express from "express";
import { getDetailsData } from "../services/details-service.js";
import {
  readDetailsParams,
  validateDetailsParams,
} from "../utils/validators.js";
import { asyncHandler } from "../middleware/error-handler.js";

export const detailsRouter = express.Router();

detailsRouter.get(
  "/:type/:id",
  asyncHandler(async function handleGetDetails(request, response) {
    const detailsParams = readDetailsParams(request.params);

    validateDetailsParams(detailsParams);

    const data = await getDetailsData(detailsParams);

    response.json(data);
  }),
);
