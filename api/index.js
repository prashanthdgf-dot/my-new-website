// Vercel serverless entry. The Express app is pre-bundled into dist/server.cjs at build time
// (see "build:web" in package.json) so Vercel does not have to compile the TypeScript server itself.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let appPromise;

export default async function handler(req, res) {
  try {
    appPromise ||= require("../dist/server.cjs").createApp();
    const { app } = await appPromise;
    return app(req, res);
  } catch (err) {
    appPromise = undefined;
    console.error("Server failed to start:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Server error");
  }
}
