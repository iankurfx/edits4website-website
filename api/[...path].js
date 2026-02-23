import vercelApp from "../dist/index.cjs";

export default async function handler(req, res) {
    // Vercel Serverless Functions don't provide a full Node.js Socket object
    // but the Express session middleware expects it to determine if HTTPS is used
    if (!req.socket) Object.defineProperty(req, 'socket', { value: {} });
    if (!req.connection) Object.defineProperty(req, 'connection', { value: {} });

    try {
        if (vercelApp.vercelHandler) return await vercelApp.vercelHandler(req, res);
        if (vercelApp.default) return await vercelApp.default(req, res);
        return res.status(500).json({ error: "Failed to load Vercel App bundle" });
    } catch (e) {
        console.error("Vercel App Error:", e);
        return res.status(500).json({ error: "Internal Server Error", message: e.message });
    }
}
