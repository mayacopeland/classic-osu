const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require("fs");

if (!fs.existsSync('./.data/')) fs.mkdirSync('./.data');
if (!fs.existsSync('./.data/replays/')) fs.mkdirSync('./.data/replays');
global.fileloc = "/.data/replays/"
app.use(fileUpload());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index")
});
app.post("/register", require("./handlers/register"));

// osu! connections
app.get("/web/osu-login.php", require("./handlers/osu_login"));

app.post("/web/osu-submit.php", require("./handlers/osu_submit"));

app.get("/web/osu-getscores.php", require("./handlers/osu_getscores"));

app.listen(require("config.json").site.port);