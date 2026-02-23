import express from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let initialized = false;
let initPromise: Promise<any> | null = null;

export default async function handler(req: any, res: any) {
    if (!initialized) {
        if (!initPromise) {
            initPromise = registerRoutes(httpServer, app).then(() => {
                initialized = true;
            }).catch(console.error);
        }
        await initPromise;
    }

    // Hand off the request to the fully setup Express app
    return app(req, res);
}
