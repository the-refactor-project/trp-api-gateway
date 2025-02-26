import { Request } from "express";
import { AppData } from "../app/types.js";

export interface AppRequest extends Request {
  appData: AppData;
}
