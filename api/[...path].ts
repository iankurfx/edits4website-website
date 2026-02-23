import { vercelHandler } from "../server/index";

export default async function handler(req: any, res: any) {
    // Pass the serverless request to our fully initialized Express app
    return await vercelHandler(req, res);
}
