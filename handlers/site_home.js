'use strict';

const { query } = require("../db");

async function handle(req, res) {
    let blogPosts = await query("SELECT title, message, userid, username FROM blog_posts INNER JOIN users ON blog_posts.userid = users.id ORDER BY blog_posts.id LIMIT 5");
    res.render("base", {
        page: "Homepage",
        posts: blogPosts
    })
}

module.exports = handle;