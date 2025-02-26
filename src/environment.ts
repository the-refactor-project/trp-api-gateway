import "dotenv/config";
import chalk from "chalk";

const environmentVariables = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "PROMO",
  "LAUNCH_DELIVERIES_URL",
  "IDENTITIES_URL",
  "ENVIRONMENT",
] as const;

type EnvironmentVariable = (typeof environmentVariables)[number];

environmentVariables.forEach((environmentVariable) => {
  if (!process.env[environmentVariable]) {
    console.log(
      chalk.red(`Missing environment variable ${environmentVariable}`)
    );
    process.exit(1);
  }
});

const environment: Record<EnvironmentVariable, string> = {
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  PROMO: process.env.PROMO!,
  LAUNCH_DELIVERIES_URL: process.env.LAUNCH_DELIVERIES_URL!,
  IDENTITIES_URL: process.env.IDENTITIES_URL!,
  ENVIRONMENT: process.env.ENVIRONMENT!,
};

export default environment;
