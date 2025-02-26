import { NextFunction, Response } from "express";
import chalk from "chalk";
import { AppRequest } from "../server/types.js";
import appsData from "../app/AppsData.js";

const validateApp = async (
  req: AppRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const appName = req.headers["x-api-key"] as string;
  console.log(chalk.magenta(`Checking app ${appName}`));

  const appData = appsData.checkApp(appName);

  if (!appData) {
    console.log(chalk.red(`Error: app name "${appName}" not allowed`));
    res.status(403).json({ error: "Access forbidden" });
    return;
  }

  console.log(chalk.magenta(`App name checked ✅`));

  req.appData = appData;

  next();
};

export default validateApp;
