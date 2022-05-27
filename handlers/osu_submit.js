'use strict';

const { query } = require("../db"),
    ScoreClass = require("../objects/score");

async function handle(req, res) {
    let passwordMD5 = req.query.pass,
        scoreData = req.query.score.split(":"),
        passed = 0,
        perfect = 0;

    if (scoreData[14] == "True") passed = 1;
    if (scoreData[11] == "True") perfect = 1;

    let score = new ScoreClass(scoreData, passwordMD5, passed, perfect);

    let scoreExists = await query("SELECT * FROM scores WHERE submit_hash = ?", score.submitHash);
    if (scoreExists.length > 0) return res.end("err: score exists")

    let userid = await query("SELECT * FROM users WHERE username = ? AND password = ?", score.username, score.password)
    if (userid.length == 0) return res.end("err: user not found");

    userid = userid[0].id;
    
    await query("INSERT INTO scores(userid,submit_hash,beatmap_md5,count300,count100,count50,countGeki,countKatu,misses,score,maxcombo,perfect,mods,passed,rank) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", userid, score.submitHash, score.mapMD5, score.count300, score.count100, score.count50, score.countGeki, score.countKatu, score.countMiss, score.score, score.maxcombo, score.perfect, score.mods, score.passed, score.grade)
    await updateUserScore(userid);
    
    console.log("new score on " + score.mapMD5 + " by " + score.username);

    let lastTopScore = await query("SELECT * FROM scores WHERE beatmap_md5 = ? AND userid = ? AND passed = 1", score.mapMD5, score.userid);
    if (lastTopScore[0].score < score.score) await query("UPDATE scores SET passed = 0 WHERE submit_hash = ?".lastTopScore[0].submitHash);
    
    res.end("ok");
}

async function updateUserScore(id) {
    let scores = await query("SELECT * FROM scores WHERE userid = ? AND passed = 1", id),
        totalUserScore = 0;
    
    scores.forEach(score => {
        totalUserScore = totalUserScore + score.score;
    });

    return await query("UPDATE users SET score = ? WHERE id = ?", totalUserScore, id);
}
module.exports = handle;