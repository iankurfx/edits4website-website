export default async function handler(req: any, res: any) {
    const app = require('../dist/index.cjs');
    // The dist/index.cjs exports the app or vercelHandler
    if (app.vercelHandler) return await app.vercelHandler(req, res);
    return app.default(req, res);
}
