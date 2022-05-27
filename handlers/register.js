'use strict';

const { query } = require("../db"),
    md5 = require("md5");

async function handle(req, res) {
    let username = req.body.username,
        password = md5(req.body.password),
        email = req.body.email;

    if (username.length < 2 || username.length > 32) return res.end("Username must be between 2 and 32 characters");
    if (req.body.password.length < 8) return res.end("Password must be greater than 8 characters");

    let userNameCheck = await query("SELECT * FROM users WHERE username = ?", username);
    if (userNameCheck.length > 0) return res.end("Username already in use");

    let emailCheck = await query("SELECT * FROM users WHERE email = ?", email);
    if (emailCheck.length > 0) return res.end(emailCheck[0].username + " has already registered with this email");

    await query("INSERT INTO users(username,password,email) VALUES(?,?,?)", username, password, email);
    
    return res.end("You have been successfully registered!");
}

module.exports = handle;