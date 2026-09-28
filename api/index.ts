import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../server";

// Vercel serverless entry: every request that is not a static file is rewritten here (see vercel.json).
let cached: Promise<{ app: any }> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  cached ||= createApp();
  const { app } = await cached;
  return app(req, res);
}
