const app = require("../dist/index.cjs");

module.exports = async function handler(req, res) {
    // Pass the request to the compiled Express app handler
    return await app.vercelHandler(req, res);
};
