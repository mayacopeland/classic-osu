const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
app.use('/static', express.static(path.join(__dirname, 'static')));

if (!fs.existsSync('./.data/')) fs.mkdirSync('./.data');
if (!fs.existsSync('./.data/replays/')) fs.mkdirSync('./.data/replays');
global.fileloc = "/.data/replays/"

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get("/", require("./handlers/site_home"));
app.get("/about", require("./handlers/site_about"));
app.get("/download", require("./handlers/site_download"));
app.get("/faq", require("./handlers/site_faq"));
app.get("/leaderboard", require("./handlers/site_leaderboard"));
app.get("/register", require("./handlers/site_register"));
app.post("/register", require("./handlers/register"));

// osu! connections
app.get("/web/osu-login.php", require("./handlers/osu_login"));

app.post("/web/osu-submit.php", require("./handlers/osu_submit"));

app.get("/web/osu-getscores.php", require("./handlers/osu_getscores"));

app.listen(require("./config.json").site.port);