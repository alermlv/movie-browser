import express from "express";
import { getSearchData } from "../services/search-service.js";
import { readSearchParams, validateSearchParams } from "../utilities/validators.js";
import { asyncHandler } from "../middleware/error-handler.js";

export const searchRouter = express.Router();

searchRouter.get(
  "/",
  asyncHandler(async function handleGetSearch(request, response) {
    const searchParams = readSearchParams(request.query);

    validateSearchParams(searchParams);

    const data = await getSearchData(searchParams);

    response.json(data);
  }),
);
