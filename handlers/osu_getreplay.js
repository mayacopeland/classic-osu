const { query } = require("../db");

async function handle(req, res) {
    console.log(req.query);
    res.end()
}

module.exports = handle;