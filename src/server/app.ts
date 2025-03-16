import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import validateApp from "../middlewares/validateApp.js";
import authMiddleware from "../auth/middleware/authMiddleware.js";
import appsData from "../app/AppsData.js";
import chalk from "chalk";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use(validateApp);

console.log("Apps found in database:");
console.log(appsData.get());

appsData.get().forEach((appData) => {
  const proxy = createProxyMiddleware({
    target: appData.url,
    changeOrigin: true,
    logger: console,
    on: {
      error: (error) => {
        console.log(chalk.red("Error on forwarding: ", error.message));
      },
      proxyReq: fixRequestBody,
    },
  });

  app.use(`/api/${appData.name}`, authMiddleware, proxy);
});

app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

export default app;
