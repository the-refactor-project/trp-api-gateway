import environment from "../environment.js";
import supabaseClient from "../supabase/supabase.js";
import { AppData } from "./types.js";

const getAppsInfo = async (): Promise<AppData[]> => {
  const { data, error } = await supabaseClient.from("apps").select();

  if (error || data.length === 0) {
    throw new Error("Couldn't retrieve apps list");
  }

  return data
    .map(({ url, url_development, ...appData }) => ({
      ...appData,
      url: environment.ENVIRONMENT === "development" ? url_development : url,
    }))
    .filter((appData) => appData.url);
};

export default getAppsInfo;
