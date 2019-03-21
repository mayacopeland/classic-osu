const { query } = require("../db");
const scoreClass = require("../objects/score");

async function handle(req, res) {
    let passwordMD5 = req.query.pass;
    let scoreData = req.query.score.split(":");
    let passed;
    let perfect;
    
    if (scoreData[14] == "True") {
        passed = 1;
    } else {
        passed = 0;
    }

    if (scoreData[11] == "True") {
        perfect = 1
    } else {
        perfect = 0;
    }

    let score = new scoreClass(scoreData, passwordMD5, passed, perfect);
    try {
        let scoreExists = await query("SELECT * FROM scores WHERE submit_hash = ?", score.submitHash);
        if (!scoreExists) {
            res.end("err: score exists")
            return;
        }
        let userid = await query("SELECT * FROM users WHERE username = ? AND password = ?", score.username, score.password)
        userid = userid[0].id;
        let lastTopScore = await query("SELECT * from SCORES where beatmap_md5 = ? AND userid = ? AND passed = 1", score.mapMD5, score.userid);
        if (lastTopScore[0].score < score.score || lastTopScore == undefined) {
            await query("UPDATE scores SET passed = 0 WHERE submit_hash = ?". lastTopScore[0].submitHash);
            await query("INSERT INTO scores(userid,submit_hash,beatmap_md5,count300,count100,count50,countGeki,countKatu,misses,score,maxcombo,perfect,mods,passed,rank) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", userid, score.submitHash, score.mapMD5, score.count300, score.count100, score.count50, score.countGeki, score.countKatu, score.countMiss, score.score, score.maxcombo, score.perfect, score.mods, score.passed, score.grade)
            await updateUserScore(userid);
            console.log("new score on " + score.mapMD5 + " by " + score.username);
        }
        res.end("ok");
    } catch {
        res.end("err");
    }

}

async function updateUserScore(id) {
    let scores = await query("SELECT * FROM scores WHERE userid = ? AND passed = 1", id);
    let totalUserScore = 0;
    scores.forEach(score => {
        totalUserScore = totalUserScore + score.score;
    });
    await query("UPDATE users SET score = ? WHERE id = ?", totalUserScore, id);
    return;
}
module.exports = handle;