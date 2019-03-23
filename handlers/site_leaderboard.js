const { query } = require("../db");

async function handle(req, res) {
    let topPlayers = await query("SELECT * FROM users ORDER BY score DESC");
    res.render("base", {
        page: "Leaderboard",
        leaderboard: topPlayers
    })
}

module.exports = handle;