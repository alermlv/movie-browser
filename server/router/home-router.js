import express from "express";
import { getHomeData } from "../services/home-service.js";
import { asyncHandler } from "../middleware/error-handler.js";

export const homeRouter = express.Router();

homeRouter.get(
  "/",
  asyncHandler(async function handleGetHome(request, response) {
    const data = await getHomeData();
    response.json(data);
  }),
);
