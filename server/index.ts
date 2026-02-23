import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

let isSetup = false;
let setupPromise: Promise<void> | null = null;

async function setupApp() {
  if (isSetup) return;
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (res.headersSent) return next(err);
    return res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "production") {
    // Only serve static files locally if NOT running on Vercel
    if (!process.env.VERCEL) {
      serveStatic(app);
    }
  } else if (!process.env.VERCEL) {
    // Hide Vite import from Vercel's static bundler to prevent esbuild crashes
    const viteModule = "./vite";
    const { setupVite } = await import(/* @vite-ignore */ viteModule);
    await setupVite(httpServer, app);
  }
  isSetup = true;
}

// In standard environments (Replit, Local, VPS), boot up the server automatically
if (!process.env.VERCEL) {
  setupApp().then(() => {
    const port = parseInt(process.env.PORT || "5000", 10);
    const isWindows = process.platform === "win32";
    httpServer.listen(
      { port, host: "0.0.0.0", ...(isWindows ? {} : { reusePort: true }) },
      () => log(`serving on port ${port}`)
    );
  });
}

// Ensure the Vercel handler sets up routes before processing requests
export const vercelHandler = async (req: Request, res: Response) => {
  if (!isSetup) {
    if (!setupPromise) setupPromise = setupApp();
    await setupPromise;
  }
  return app(req, res);
};

export default app;
