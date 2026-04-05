import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { router } from "./router/index.js";
import { handleNotFound, handleError } from "./middleware/error-handler.js";

const app = createApp();

startServer();

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
    }),
  );

  app.use(express.json());

  app.use("/api", router);

  app.use(handleNotFound);
  app.use(handleError);

  return app;
}

function startServer() {
  app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
  });
}
