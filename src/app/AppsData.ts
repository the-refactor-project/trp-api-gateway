import chalk from "chalk";
import getAppsInfo from "./index.js";
import { AppData } from "./types.js";

class AppsData {
  private appsData: AppData[] = [];

  public async load(): Promise<void> {
    this.appsData = await getAppsInfo();

    this.appsData.forEach((appData) => {
      console.log(
        `✅ Registered app ${chalk.blue(appData.name)} at ${chalk.blue(
          appData.url
        )}`
      );
    });
  }

  public get(): AppData[] {
    return this.appsData;
  }

  public checkApp(appName: string): AppData | undefined {
    return this.appsData.find((appData) => appData.name === appName);
  }
}

const appsData = new AppsData();

await appsData.load();

export default appsData;
