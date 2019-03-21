const { query } = require("../db");

async function handle(req, res) {
    let username = req.query.username;
    let passwordMD5 = req.query.password;
    
    let userExists = await query("SELECT * FROM users WHERE username = ? AND password = ?", username, passwordMD5);
    if (userExists.length > 0) {
        res.end("1");
    } else {
        res.end("0")
    }
}

module.exports = handle;