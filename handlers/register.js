const { query } = require("../db");
const md5 = require("md5");

async function handle(req, res) {
    let username = req.body.username;
    let password = md5(req.body.password);
    let email = req.body.email;
    if (username.length < 2 || username.length > 32) {
        res.end("Username must be between 2 and 32 characters");
        return;
    }
    if (req.body.password.length < 8) {
        res.end("Password must be greater than 8 characters");
        return;
    }
    let userNameCheck = await query("SELECT * FROM users WHERE username = ?", username);
    if (userNameCheck.length > 0) {
        res.end("Username already in use");
        return;
    }
    let emailCheck = await query("SELECT * FROM users WHERE email = ?", email);
    if (emailCheck.length > 0) {
        res.end(emailCheck[0].username + " has already registered with this email");
        return;
    }
    await query("INSERT INTO users(username,password,email) VALUES(?,?,?)", username, password, email);
    res.end("You have been successfully registered!");
    return;
}

module.exports = handle;