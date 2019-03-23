const { query } = require("../db");

async function handle(req, res) {
    let scores = await getScores(req);
    res.end(scores);
}
async function getScores(req) {
    let scores = await query("SELECT * FROM SCORES WHERE beatmap_md5 = ? AND passed = 1 ORDER BY score DESC", req.query.c);
    let text = "";
    if (scores.length > 0) {
        let text = "";
        let i;
        for (i = 0; i < scores.length; i++) {
            let score = scores[i];
            let userData = await query("SELECT * FROM users WHERE id = ?", score.userid);
            let perfect = "false";
            if (score.perfect == 1) {
                perfect = "true";
            }
            let scoreText = score.id + ":" + userData[0].username + ":" + score.score + ":" + score.maxcombo + ":" + score.count50 + ":" + score.count100 + ":" + score.count300 + ":" + score.misses + ":" + score.countKatu + ":" + score.countGeki + ":" + perfect + ":" + score.mods + "\n"
            text = text + scoreText;
        }
        if (i = scores.length) {
            return text
        }
    } else {
        return ""
    }
}
module.exports = handle;