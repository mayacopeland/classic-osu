class score {
    constructor(scoreData, password, passed, perfect) {
        this.username = scoreData[1];
        this.password = password;
        this.mapMD5 = scoreData[0];
        this.submitHash = scoreData[2];
        this.count300 = scoreData[3];
        this.count100 = scoreData[4];
        this.count50 = scoreData[5];
        this.countGeki = scoreData[6];
        this.countKatu = scoreData[7];
        this.countMiss = scoreData[8];
        this.score = scoreData[9];
        this.maxcombo = scoreData[10];
        this.perfect = perfect;
        this.mods = scoreData[13];
        this.passed = passed;
        this.grade = scoreData[12];
    }
}

module.exports = score;