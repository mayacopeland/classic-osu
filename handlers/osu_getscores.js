'use strict';

const { query } = require("../db");

async function handle(req, res) {
    let scores = await query("SELECT * FROM scores WHERE beatmap_md5 = ? AND passed = 1 ORDER BY score DESC", req.query.c);
    if (scores.length == 0) return "";

    let text = "";
    for (let i = 0; i < scores.length; i++) {
        let score = scores[i],
            userData = await query("SELECT * FROM users WHERE id = ?", score.userid),
            perfect = "false";

        if (score.perfect == 1) perfect = "true";
        
        let scoreText = score.id + ":" + userData[0].username + ":" + score.score + ":" + score.maxcombo + ":" + score.count50 + ":" + score.count100 + ":" + score.count300 + ":" + score.misses + ":" + score.countKatu + ":" + score.countGeki + ":" + perfect + ":" + score.mods + "\n";
        text = text + scoreText;
    }
    res.end(text);
}

module.exports = handle;