import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { router } from "./router/index.js";

const app = createServer();

startServer();

function createServer() {
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  
  app.use("/api", router);

  return app;
}

function startServer() {
  app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
  });
}
