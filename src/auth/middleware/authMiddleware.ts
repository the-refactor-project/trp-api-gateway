import { User } from "@supabase/supabase-js";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../types.js";
import chalk from "chalk";
import environment from "../../environment.js";

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const identityServerUrl = `${environment.IDENTITIES_URL}/checkIdentity`;

    console.log(chalk.magenta(`Checking identity at ${identityServerUrl}`));

    const response = await fetch(
      `${environment.IDENTITIES_URL}/checkIdentity`,
      {
        method: "GET",
        headers: {
          authorization: req.headers.authorization!,
        },
      }
    );

    const data = (await response.json()) as { user: User };

    /* const { data } = await axiosInstance.get<{ user: User }>(
      identityServerUrl,
      {
        headers: req.headers,
      }
    ); */

    console.log(chalk.magenta(`Identity checked ✅`));

    const user = data.user;

    req.user = user;

    next();
  } catch (error: unknown) {
    if (
      ["ECONNRESET", "ECONNREFUSED"].includes((error as { code: string }).code)
    ) {
      console.log(
        chalk.red(
          "Error connecting to identities server:",
          (error as { code: string }).code
        )
      );
      res.status(503).json({ error: "Service Unavailable" });
      return;
    }

    console.log(chalk.red((error as Error).message));
    res.status(401).json({ error: "Not allowed" });
  }
};

export default authMiddleware;
