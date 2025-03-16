import dotenv from "dotenv";

dotenv.config();

export const BACKLOG_API_KEY = process.env.BACKLOG_API_KEY || "";
export const BACKLOG_SPACE_ID = process.env.BACKLOG_SPACE_ID || "";
export const BACKLOG_PROJECT_ID = process.env.BACKLOG_PROJECT_ID || "";
