// @ts-ignore
import vercelApp from "../dist/index.cjs";
export default async function handler(req: any, res: any) {
    if (vercelApp.vercelHandler) return await vercelApp.vercelHandler(req, res);
    if (vercelApp.default) return await vercelApp.default(req, res);
    return res.status(500).json({ error: "Failed to load Vercel App bundle" });
}
