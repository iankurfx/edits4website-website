const vercelApp = require('../dist/index.cjs');

module.exports = async function handler(req, res) {
    if (vercelApp.vercelHandler) return await vercelApp.vercelHandler(req, res);
    if (vercelApp.default) return await vercelApp.default(req, res);
    return res.status(500).json({ error: "Failed to load Vercel App bundle" });
};
